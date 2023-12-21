local tabletObj = nil

lib.locale()

local function ToggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

function ShowMDT()
    lib.callback('vrs_mdt:isPlayerPolice', false, function(isPolice)
        if isPolice then
            lib.requestAnimDict(Config.Tablet.AnimDict)
            lib.requestModel(Config.Tablet.Prop)
            local plyPed = PlayerPedId()
            tabletObj = CreateObject(Config.Tablet.Prop, 0.0, 0.0, 0.0, true, true, false)
            local tableBoneIndex = GetPedBoneIndex(plyPed, Config.Tablet.Bone)
            AttachEntityToEntity(tabletObj, plyPed, Config.Tablet.BoneIndex, Config.Tablet.OffSet, Config.Tablet.Rot, true, false, false, false, 2, true)
            SetModelAsNoLongerNeeded(Config.Tablet.Prop)
            TaskPlayAnim(plyPed, Config.Tablet.AnimDict, Config.Tablet.AnimName, 3.0, 3.0, -1, 49, 0, 0, 0, 0)
            UpdateMDT()
            Citizen.Wait(500)
            ToggleNuiFrame(true)
        else
            lib.notify({
                description = locale('insufficient_permits'),
                type = 'error',
            })
        end
    end)
end

function UpdateMDT()
    local data = lib.callback.await('vrs_mdt:getServerData', false)
    data.minsInService = math.floor(GetGameTimer()/1000/60)
    SendReactMessage('setData', data)
end

RegisterNetEvent('vrs_mdt:UpdateMDT', function(data)
    UpdateMDT()
end)

RegisterNetEvent('vrs_mdt:sendBill', function(target, society, label, fine)
    -- print(target, society, label, fine, type(fine))
    TriggerServerEvent('esx_billing:sendBill', target, society, label, fine)
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

exports('showMDT', ShowMDT)
