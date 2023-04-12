/**
 * * buil-in modules *
 * http
 * fs
 * mysql
 * path
 */
import http from "http";
import fs from "fs";
import mysql from "mysql";
import { parse } from "path";
import callMain from "./callMain";

/**
 * * custom modules *
 */

/**
 * * MySQL Config 정보 *
 * * MySQL 연결에 필요한 객체 
 */

 const mysqlInfo = {
  host: "192.168.0.93",
  user: "guest",
  password: "0000",
  database: "mungta",
};

/**
 * * server 실행 부분
 * * 주요사안
 * * GET 요청 처리 부분
 */

const server = http.createServer((request, response) => {

  /**
   * * 현재 createServer는 두개의 기능을 코어로 동작함
   * * 1. GET 요청 처리
   * * 2. POST 요청 처리
   */

  if(request.method === "GET") {

    /**
     * ? calMain() 함수 주요기능
     * * request.url에 따라서 다른 기능을 수행함
     */
    callMain(request, response);

  }

  if(request.method === "POST") {
  
    /**
     * ? callPostImage() 함수 주요기능
     * * request.url에 따라서 다른 기능을 수행함
     * */
    callPostImage(request, response);
  }
});