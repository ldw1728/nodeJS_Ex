module.exports = function(app, fs){
    
    app.get('/', (req, res)=>{

        var sess = req.session;

        res.render('index', { //render메소드의 두번째 인자로써 데이터를 넘김.
            title : "MY HOMEPAGE",
            length : 5,
            name: sess.name,
            username : sess.username
        });
    });
    
    app.get('/list', (req, res)=>{
        fs.readFile(__dirname + "/../data/" + "user.json", 'utf-8', (err, data)=>{
            //__dirname은 현재 모듈의 위치를 나타냄.
            console.log(data);
            res.end(data);
        });
    });

    app.get('/getUser/:username', (req,res)=>{
        fs.readFile(__dirname + "/../data/user.json", 'utf-8', (err, data)=>{
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    app.post('/addUser/:username', (req, res)=>{
        var result = {  };
        var username = req.params.username;
        //request로 부터 받아온 유저정보 유효성 검사
        if(!req.body["password"] || !req.body["name"]){ //request body내부의 속성값에 접근.
            result["success"] = 0;
            result["error"] = "invaild request";
            res.json(result);
            return;
        }

        fs.readFile(__dirname + "/../data/user.json", 'utf-8', (err, data)=>{
            var users = JSON.parse(data);
            //유저이름 중복 시
            if(users[username]){
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            users[username] = req.body;

            fs.writeFile(__dirname + "/../data/user.json",JSON.stringify(users, null, '\t'),
                    'utf-8', (err, data)=>{
                    result['success'] = 1;
                    res.json(result);
            });
        });
    });

    app.put('/updateUser/:username', (req, res)=>{
        var result = {  };
        var username = req.params.username;
        //request로 부터 받아온 유저정보 유효성 검사
        if(!req.body["password"] || !req.body["name"]){ //request body내부의 속성값에 접근.
            result["success"] = 0;
            result["error"] = "invaild request";
            res.json(result);
            return;
        }

        fs.readFile(__dirname + "/../data/user.json", 'utf-8', (err, data)=>{
            var users = JSON.parse(data);
            //유저이름 중복 시
            if(!users[username]){
                result["info"] = "addNewUser";
            }else{
                result["info"] = "update";
            }

            users[username] = req.body;

            fs.writeFile(__dirname + "/../data/user.json",JSON.stringify(users, null, '\t'),
                    'utf-8', (err, data)=>{
                    result['success'] = 1;
                    res.json(result);
            });
        });
    });

    app.delete('/deleteUser/:username', (req, res)=>{
        var result = {  };
        var username = req.params.username;
        fs.readFile(__dirname + "/../data/user.json",'utf-8', (err, data)=>{
            var users = JSON.parse(data);

            if(!users[username]){
                result['error'] = "not exist User";
                res.json(result);
                return;
            }
            
            delete users[username];

            fs.writeFile(__dirname + "/../data/user.json",JSON.stringify(users,null,'\t')
                , 'utf-8', (err, data)=>{
                    result["success"] = 1;
                    res.json(result);
                    return;
                });
            
        });


    });

    app.get("/login/:username/:password", (req, res)=>{
        var sess = req.session;

        fs.readFile(__dirname + "/../data/user.json", "utf-8", (err, data)=>{
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;
            var result = {  };
            if(!users[username]){
                result["success"] = 0;
                result["error"] = "not Found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password){
                result['succes'] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);
            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }
        });
    });

    app.get('/logout', (req, res)=>{
        var sess = req.session;

        if(sess.username){
            req.session.destroy((err)=>{
                if(err)
                    console.log(err);
                else
                    res.redirect('/');
            });
        }else{
            res.redirect('/');
        }
    });
    
}