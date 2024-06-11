"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./action.ctrl");

// --deprecated--
// 액션 등록
// - 앱에서 호출
// - 현재 시스템이 preset 모드 또는 manual 모드일 경우 실행할 액션 요청
// router.post("/id", ctrl.handleRegisterAction);

// 액션 리스트 등록
// - 앱에서 호출
// - 현재 시스템이 preset 모드 또는 manual 모드일 경우 실행할 액션 요청
router.post("/list", ctrl.handleRegisterActionList);

// 액션 삭제
// - 앱에서 호출
// - 실행 예정의 액션 취소
router.delete("/id", ctrl.handleCancelAction);

// 액션 코드 조회
// - 앱에서 호출
// - 미리 정의된 액션에 대한 코드 리스트를 조회
router.get("/list/code", ctrl.handleGetCodeList);

// 액션 큐 조회
// - 앱에서 호출
// - 액션 등록을 통해 등록되었으며 아직 실제 실행되지 않은 액션 리스트를 조회
router.get("/list/queue", ctrl.handleGetQueueList);

module.exports = router;
