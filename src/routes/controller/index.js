"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./controller.ctrl");

// 컨트롤러 등록
// - 컨트롤러에서 호출
// - 아두이노가 부팅되며 호출
router.post("/", ctrl.handleRegisterController);

// 컨트롤러 삭제
// - 디버깅
// - 기존 등록된 컨트롤러 삭제
router.delete("/", ctrl.handleDeleteController);

// 컨트롤러 업데이트
// - 앱에서 호출
// - 기존 등록된 컨트롤러 업데이트
router.patch("/", ctrl.handleUpdateController);

// 컨트롤러 목록 조회
// - 앱에서 호출
// - 등록된 컨트롤러 리스트 조회
router.get("/list", ctrl.handleGetController);

module.exports = router;
