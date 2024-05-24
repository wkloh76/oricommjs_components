-- Up
CREATE TABLE IF NOT EXISTS `info` (
  `id` INTEGER PRIMARY KEY,
  `devid` INTEGER DEFAULT 0,
  `desc` TEXT NOT NULL,
  `hostname` TEXT NULL,
  `version` FLOAT NOT NULL
);
INSERT INTO `info` (`id`, `desc`,`version`) VALUES (1,'Multibox Application',1.1);

CREATE TABLE IF NOT EXISTS `network` (
  `nid` INTEGER PRIMARY KEY,
  `adapter` TEXT NOT NULL,
  `type` TEXT NOT NULL,
  `macaddr` TEXT NOT NULL,
  `ssid` TEXT NULL,,
  `password` TEXT NULL,
  `active` BOOLEAN DEFAULT false,
  `valid` INT DEFAULT 0
);
--INSERT INTO `network` (`nid`, `adapter`,`type`,`macaddr`,`ssid`,`password`) VALUES (1,'eth0','CABLE','00:e0:54:77:ab',NULL,NULL);

{
  "_id": "hconfig",
  "name": "V.S Mini Control Box",
  "hostname": "",
  "devid": "0",
  "version": "1.1",
  "desc": "Multibox Application",
  
    "active": "wifi"
  },
  "server": {
    "system": {
      "host": "192.168.11.220",
      "port": 20000,
      "prj": "prod_mgmt",
      "publicapi": [
        {
          "action": "dev-con-v2.php",
          "params": [],
          "paramsvalue": [
            {
              "id": 0,
              "name": "val1",
              "version": "val2",
              "desc": "val3",
              "mac_addr": "val4"
            }
          ]
        },
        {
          "action": "src/admin/web/index.php/device_mgmt/api-v2/dev-reg",
          "params": [],
          "paramsvalue": [
            {
              "id": 0,
              "name": "val1",
              "version": "val2",
              "desc": "val3",
              "mac_addr": "val4"
              
            }
          ]
        },
        {
          "action": "src/prod/web/index.php/wi_mgmt/api/update-device-data",
          "params": [
            "dev_info"
          ],
          "paramsvalue": [
            {
              "mac_addr": "val1"
            }
          ]
        },
        {
          "action": "src/prod/web/index.php/wi_mgmt/api/get-current-line-setting",
          "params": [
            "dev_info"
          ],
          "paramsvalue": [
            {
              "mac_addr": "val1"
            }
          ]
        }
      ],
      "apilist": {}
    }
  },
  "application":{
    "process":{
      "primary":"comp_1",
      "secondary":[]
    }
  },
  "jobsheets":{},
  "developer": {
    "members": [
      "CM Teo -- General Manager",
      "WK Loh -- Manager",
      "KC Tuan -- Senior Assistance Manager",
      "Ahmad Afnan Yusof -- Senior Engineer",
      "CX You -- Engineer",
      "ZP Lim -- Engineer Junior",
      "Mohd Aiman Hafiz Bin Zahari -- Engineer Junior",
      "Khairul Anuar Mohd Rizo -- Engineer Junior"
    ]
  },
  "complete": false,
  "sudopwd":"VS2rdroot01"
}
