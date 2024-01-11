fx_version 'cerulean'
game 'gta5'

author 'noway'
description 'Tablet della polizia (restyle noway)'
version 'v1.4.0'
lua54 'yes'

shared_scripts {
  '@ox_lib/init.lua',
  'shared/*.lua'
}

ui_page 'web/build/index.html'

client_script "client/**/*.lua"
server_script "server/**/*.lua"

files {
	'web/build/index.html',
	'web/build/**/*',
  'locales/*.json'
}