{"filter":false,"title":"page_model.js","tooltip":"/models/page_model.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":9,"column":35},"action":"insert","lines":["var mongoose = require('mongoose'),","    Schema = mongoose.Schema;","var PageSchema = new Schema({","    name: {","        type: String,","        unique: true","    },","    commentId: Schema.ObjectId","});","mongoose.model('Page', PageSchema);"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":35},"end":{"row":9,"column":35},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":187,"mode":"ace/mode/javascript"}},"timestamp":1417920654556,"hash":"0958222e87c3faa5335c27a6f7669df1072ef49a"}