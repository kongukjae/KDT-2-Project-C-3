const html = {
  htmlFunc: function(data){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        *{
          padding: 0%;
          margin: 0%;
          border: 1px dotted red;
        }
      </style>
    </head>
    <body>
      ${data}
    </body>
    </html>`
  },
  mapBody: `<script src="/mainStyle.js"></script>
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cc6e89c717085e748e17665afaa2c5ac"></script>
  <script src="/map.js"></script>`
}
export default html;