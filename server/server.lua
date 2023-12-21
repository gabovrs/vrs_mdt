ESX = exports['es_extended']:getSharedObject()

lib.locale()

local wantedPlayers = {}

lib.callback.register('vrs_mdt:isPlayerPolice', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    return xPlayer.getJob().name == 'police'
end)

lib.callback.register('vrs_mdt:getServerData', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local playerImage = exports.oxmysql:query_async('SELECT mdt_image FROM users WHERE identifier = ?', {xPlayer.getIdentifier()})
    return {
        playerName = xPlayer.getName(),
        jobGrade = xPlayer.getJob().grade_label,
        playerImage = playerImage[1].mdt_image,
        wantedPlayers = wantedPlayers,
        playersInService = #ESX.GetExtendedPlayers('job', 'police'),
    }
end)

lib.callback.register('vrs_mdt:getVehicleByPlate', function(source, plate)
    local vehicleData = exports.oxmysql:query_async('SELECT * FROM owned_vehicles WHERE plate = ?', {plate})
    if #vehicleData > 0 then
        local ownerData = exports.oxmysql:query_async('SELECT firstname, lastname FROM users WHERE identifier = ?', {vehicleData[1].owner})
        if #ownerData > 0 then
            return {
                vehicleData = vehicleData[1],
                ownerData = ownerData[1],
            }
        end
    else
        TriggerClientEvent('ox_lib:notify', source, {
            description = locale('no_data_found'),
            type = 'error'
        })
    end
end)

lib.callback.register('vrs_mdt:getCitizenByName', function(source, name)
    local data = {}
    local name = '%' ..name.. '%'
    local citizenData = exports.oxmysql:query_async('SELECT identifier, firstname, lastname, dateofbirth, sex, mdt_image FROM users WHERE CONCAT(firstname, " ", lastname) LIKE ?', {name})
    if #citizenData > 0 then
        return citizenData
    else
        TriggerClientEvent('ox_lib:notify', source, {
            description = locale('no_data_found'),
            type = 'error'
        })
    end
end)

lib.callback.register('vrs_mdt:getCitizenDetailsByIdentifier', function(source, identifier)
    local data = {}
    local citizenData = exports.oxmysql:query_async('SELECT identifier, firstname, lastname, dateofbirth, sex, mdt_image FROM users WHERE identifier = ?', {identifier})
    local criminalRecord = exports.oxmysql:query_async('SELECT * FROM mdt_criminal_records WHERE user_id = ?', {identifier})
    if #citizenData > 0 then
        return {
            identifier = citizenData[1].identifier,
            image = citizenData[1].image,
            firstname = citizenData[1].firstname,
            lastname = citizenData[1].lastname,
            dateofbirth = citizenData[1].dateofbirth,
            sex = citizenData[1].sex,
            criminalRecord = criminalRecord
        }
    else
        TriggerClientEvent('ox_lib:notify', source, {
            description = locale('no_data_found'),
            type = 'error'
        })
    end
end)

RegisterServerEvent('vrs_mdt:addWantedPlayer', function(data)
    table.insert(wantedPlayers, data)
end)

RegisterServerEvent('vrs_mdt:removeWantedPlayer', function(index)
    table.remove(wantedPlayers, index+1)
end)

RegisterServerEvent('vrs_mdt:updateProfileImage', function(data)
    local src = source
    exports.oxmysql:update('UPDATE users SET mdt_image = ? WHERE identifier = ?', {data.image, data.identifier}, function(affectedRows)
        if affectedRows > 0 then
            TriggerClientEvent('vrs_mdt:updateMDT', src)
        end
    end)
end)

RegisterServerEvent('vrs_mdt:addCriminalRecord', function(data)
    local xPlayer = ESX.GetPlayerFromId(source)
    local xTarget = ESX.GetPlayerFromIdentifier(data.user_id)

    crimes = {}

    for k, v in pairs(data.crimes) do
        table.insert(crimes, v.name)
    end

    if xTarget then
        TriggerClientEvent('vrs_mdt:sendBill', xPlayer.source, xTarget.source, 'society_police', json.encode(crimes), data.fine)
    else
        exports.oxmysql:insert('INSERT INTO `billing` (identifier, sender, target_type, target, label, amount) VALUES (?, ?, ?, ?, ?, ?)', {
            data.user_id, xPlayer.getIdentifier(), 'society', 'society_police', json.encode(crimes), data.fine
        })
    end

    exports.oxmysql:insert('INSERT INTO `mdt_criminal_records` (user_id, officer_id, description, crimes, fine, jail) VALUES (?, ?, ?, ?, ?, ?)', {
        data.user_id, xPlayer.getIdentifier(), data.description, json.encode(crimes), data.fine, data.jail
    })
end)