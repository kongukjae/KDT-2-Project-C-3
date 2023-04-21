import {Server} from "socket.io";

//네임 테일은 이름 정할 때 아이디 뒤에 들어갈 이미지 이름 넣어주는 곳
//없다면 '.'만 넣으면 됌
export default function chatWithSocketIo(server){
  //소켓용 서버
  const socketServer = new Server(server);

  // namespace /chat에 접속한다.
  let chat = socketServer.of('/chat').on('connection', function(socket) {
    socket.on('chat message', function(data){
      console.log('message from client: ', data);
      console.log(data);
      var name = data.name;
      var room = data.room;

      // room에 join한다
      socket.join(room);
      // room에 join되어 있는 클라이언트에게 메시지를 전송한다
      chat.to(room).emit('chat message', name +"&"+ data.msg);
    });
  });
}