INSERT INTO airflower.TB_SYSTEM_CODE (MODE,MODE_NAME) VALUES
	 (0,'Sleep'),
	 (1,'A.I'),
	 (2,'Preset'),
	 (3,'Manual');

INSERT INTO airflower.TB_SYSTEM_CURRENT (ID,CURRENT_MODE,CURRENT_DATETIME,CURRENT_TEMP,CURRENT_HUMID) VALUES
	 (1,0,'2024-06-12 11:55:00',26.0,74.0);

INSERT INTO airflower.TB_ACTION_CODE (ACTION_TYPE,ACTION_NAME,ACTION_IR_CODE) VALUES
	 (0,'PowerOff','0'),
	 (1,'PowerOn','1');
	 (2,'Cooling','2');
	 (3,'Dehumidification','3');
	 (4,'Heat','4');

