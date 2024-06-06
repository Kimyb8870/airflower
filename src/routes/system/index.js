"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./system.ctrl");

// 시스템 모드 업데이트
// - 앱에서 호출
// - 서비스 기능 상태를 총 4가지 모드 중 하나로 선택하여 업데이트
router.patch("/mode", ctrl.handleUpdateMode);

// 시스템 현황 조회
// - 앱에서 호출
// - 현재 설정된 시스템 현황값을 조회. TB_SYSTEM_CURRENT의 값과 같음
router.get("/current", ctrl.handleGetCurrent);

// 시스템 현황 업데이트
// - 컨트롤러에서 호출
// - 현재 온습도 정보를 전달하여 업데이트
router.patch("/current", ctrl.handleUpdateCurrent);

module.exports = router;
