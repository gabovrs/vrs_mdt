ESX = exports['es_extended']:getSharedObject()

local tabletObj = nil
local uiLoaded = false

local function ToggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

function IsPolice()
    local playerData = ESX.GetPlayerData()
    for _, job in pairs(Config.PoliceJobs) do
        if playerData.job.name == job then
            return true
        end
    end
end

function UpdateMDT()
    local data = lib.callback.await('vrs_mdt:getServerData', false)
    data.minsInService = math.floor(GetGameTimer()/1000/60)
    SendReactMessage('setData', data)
    return true
end

function ShowMDT()
    if IsPolice() then
        lib.requestModel(Config.Tablet.Prop)
        lib.requestAnimDict(Config.Tablet.AnimDict)
        local coords = GetEntityCoords(cache.ped)
        tabletObj = CreateObject(Config.Tablet.Prop, coords.x, coords.y, coords.z, true, true, true)
        AttachEntityToEntity(tabletObj, cache.ped, GetPedBoneIndex(cache.ped, Config.Tablet.Bone), Config.Tablet.OffSet, Config.Tablet.Rot, true, true, false, true, 0, true)
        SetModelAsNoLongerNeeded(Config.Tablet.Prop)
        TaskPlayAnim(cache.ped, Config.Tablet.AnimDict, Config.Tablet.AnimName, 3.0, 3.0, -1, 49, 0, 0, 0, 0)
        RemoveAnimDict(Config.Tablet.AnimDict)
        UpdateMDT()
        ToggleNuiFrame(true)
    else
        lib.notify({
            description = locale('insufficient_permits'),
            type = 'error',
        })
    end
end

Citizen.CreateThread(function()
    local locales = lib.getLocales()
    local uiLocales = {}
    for k, v in pairs(locales) do
		if k:find('^ui_')then
			uiLocales[k] = v
		end
	end
    local data = {
        locales = uiLocales,
        fines = Config.Fines
    }

    while not uiLoaded do Wait(100) end
    SendReactMessage('setupMDT', data)
end)

RegisterNetEvent('vrs_mdt:UpdateMDT', function(data)
    UpdateMDT()
end)

RegisterNetEvent('vrs_mdt:sendBill', function(target, society, label, fine)
    TriggerServerEvent('esx_billing:sendBill', target, society, label, fine)
end)

RegisterNetEvent('vrs_mdt:showMDT', function()
    ShowMDT()
end)

RegisterNUICallback('hideFrame', function(_, cb)
    ToggleNuiFrame(false)
    ClearPedSecondaryTask(cache.ped)
    Citizen.Wait(250)
    DetachEntity(tabletObj, true, false)
    DeleteEntity(tabletObj)
    cb({})
end)

RegisterNUICallback('getVehicleData', function(data, cb)
    local response = lib.callback.await('vrs_mdt:getVehicleByPlate', false, data.plate)
    local vehicleInfo = json.decode(response.vehicleData.vehicle)
    local vehicleBrand = GetMakeNameFromVehicleModel(vehicleInfo.model)
    local vehicleModel = GetDisplayNameFromVehicleModel(vehicleInfo.model)
    local retData = {
        firstName = response.ownerData.firstname,
        lastName = response.ownerData.lastname,
        plate = response.vehicleData.plate,
        brand = GetLabelText(vehicleBrand) == 'NULL' and locale('unknow') or vehicleBrand,
        model = GetLabelText(vehicleModel) == 'NULL' and locale('unknow') or vehicleModel
    }
    cb(retData)
end)

RegisterNUICallback('getCitizenData', function(data, cb)
    local response = lib.callback.await('vrs_mdt:getCitizenByName', false, data.name)
    cb(response)
end)

RegisterNUICallback('getCitizenDetails', function(data, cb)
    local response = lib.callback.await('vrs_mdt:getCitizenDetailsByIdentifier', false, data.identifier)
    cb(response)
end)

RegisterNUICallback('addWantedPlayer', function(data, cb)
    TriggerServerEvent('vrs_mdt:addWantedPlayer', data)
    UpdateMDT()
end)

RegisterNUICallback('addCriminalRecord', function(data, cb)
    TriggerServerEvent('vrs_mdt:addCriminalRecord', data)
end)

RegisterNUICallback('removeWantedPlayer', function(data, cb)
    TriggerServerEvent('vrs_mdt:removeWantedPlayer', data)
    UpdateMDT()
end)

RegisterNUICallback('updateProfileImage', function(data, cb)
    if not data.image then return end
    TriggerServerEvent('vrs_mdt:updateProfileImage', data)
    lib.notify({
        description = locale('updated_image'),
        type = 'success',
    })
end)

RegisterNUICallback('uiLoaded', function(data, cb)
	uiLoaded = true
    cb(1)
end)

exports('showMDT', ShowMDT)
