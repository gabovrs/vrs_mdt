lib.locale()

Config = {}

Config.PoliceJobs = {
    'police',
    'sheriff'
}

Config.Command = {
    Enabled = true,
    Name = 'showmdt',
    ItemName = 'mdt' --set to false to disable item checking
}

Config.Tablet = {
    AnimDict = 'amb@code_human_in_bus_passenger_idles@female@tablet@base',
    AnimName = 'base',
    Prop = 'prop_cs_tablet',
    Bone = 60309,
    OffSet = vec3(0.0, 0.0, 0.0),
    Rot = vec3(0.0, 0.0, 0.0)
}

Config.Fines = {
    { label = locale('fine_abusive_horn_use'), price = 250000, jail = 0 },
    { label = locale('fine_illegal_crosswalk_crossing'), price = 250000, jail = 0 },
    { label = locale('fine_wrong_way_driving'), price = 1000000, jail = 0 },
    { label = locale('fine_illegal_u_turn'), price = 1000000, jail = 0 },
    { label = locale('fine_offroad_driving'), price = 750000, jail = 0 },
    { label = locale('fine_refusing_legal_order'), price = 4000000, jail = 0 },
    { label = locale('fine_vehicle_blocking_way'), price = 250000, jail = 0 },
    { label = locale('fine_illegal_parking'), price = 200000, jail = 0 },
    { label = locale('fine_running_stop_sign'), price = 150000, jail = 0 },
    { label = locale('fine_running_red_light'), price = 500000, jail = 0 },
    { label = locale('fine_driving_illegal_vehicle'), price = 1000000, jail = 0 },
    { label = locale('fine_hit_and_run'), price = 3000000, jail = 0 },
    { label = locale('fine_speeding_50_residential'), price = 200000, jail = 0 },
    { label = locale('fine_speeding_80_urban'), price = 600000, jail = 0 },
    { label = locale('fine_speeding_120_highway'), price = 1250000, jail = 0 },
    { label = locale('fine_traffic_flow_obstruction'), price = 300000, jail = 0 },
    { label = locale('fine_public_alcohol_consumption'), price = 150000, jail = 0 },
    { label = locale('fine_disorderly_conduct'), price = 400000, jail = 15 },
    { label = locale('fine_obstruction_of_justice'), price = 2000000, jail = 20 },
    { label = locale('fine_insulting_civilians'), price = 200000, jail = 0 },
    { label = locale('fine_disrespecting_officer'), price = 500000, jail = 0 },
    { label = locale('fine_verbal_threat_to_civilian'), price = 1500000, jail = 0 },
    { label = locale('fine_verbal_threat_to_officer'), price = 2500000, jail = 15 },
    { label = locale('fine_false_information_endangering'), price = 750000, jail = 20 },
    { label = locale('fine_bribery_attempt'), price = 10000000, jail = 30 },
    { label = locale('fine_illegal_high_caliber_weapon'), price = 25000000, jail = 50 },
    { label = locale('fine_illegal_low_caliber_weapon'), price = 4000000, jail = 35 },
    { label = locale('fine_vehicle_theft'), price = 8000000, jail = 15 },
    { label = locale('fine_illegal_substance_sale_attempt'), price = 4000000, jail = 20 },
    { label = locale('fine_substance_manufacturing_or_sale'), price = 3000000, jail = 30 },
    { label = locale('fine_illegal_substance_possession'), price = 1500000, jail = 10 },
    { label = locale('fine_civilian_kidnapping'), price = 13000000, jail = 50 },
    { label = locale('fine_officer_kidnapping'), price = 30000000, jail = 60 },
    { label = locale('fine_armed_robbery_store'), price = 12500000, jail = 20 },
    { label = locale('fine_armed_robbery_jewelry'), price = 15000000, jail = 30 },
    { label = locale('fine_armed_robbery_bank'), price = 40000000, jail = 50 },
    { label = locale('fine_armed_assault_civilian'), price = 10000000, jail = 20 },
    { label = locale('fine_armed_assault_officer'), price = 23000000, jail = 30 },
    { label = locale('fine_attempted_homicide_civilian'), price = 5000000, jail = 30 },
    { label = locale('fine_attempted_homicide_officer'), price = 15000000, jail = 50 },
    { label = locale('fine_first_degree_murder_civilian'), price = 10000000, jail = 60 },
    { label = locale('fine_first_degree_murder_officer'), price = 30000000, jail = 90 },
    { label = locale('fine_fleeing_officers'), price = 7000000, jail = 15 },
    { label = locale('fine_black_money_possession'), price = 10000000, jail = 5 },
    { label = locale('fine_crime_fine_accumulation'), price = 1000000, jail = 5 },
    { label = locale('fine_physical_assault_officer'), price = 5000000, jail = 15 },
    { label = locale('fine_fraud_under_40_million'), price = 35000000, jail = 40 },
    { label = locale('fine_fraud_over_40_million'), price = 50000000, jail = 40 },
}
