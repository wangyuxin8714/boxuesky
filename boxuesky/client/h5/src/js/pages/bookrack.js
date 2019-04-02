require(["../js/config.js"],function () {
    require(["mui"],function (mui) {
        let bookList = document.querySelector(".book-list")
        let deletes = document.querySelectorAll(".delete");
        let ajax = (opts) =>{
            mui.ajax('/api/findBookrack',{
                data: opts.data,
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                success: opts.success
            });
        } 

        //=> 初始化的方法代码的入口
        function init () {
            let promise = new Promise((resolve,reject) => {
                ajax({
                    data: {
                        uid: window.localStorage.getItem("uid") || "5c9b65bf144946efd54dce74"
                    },
                    success: resolve
                })
            })
            promise.then((result) => {
                render(result)
            }).then(() => {
                bindEvent()
            })
        }

        //=> 页面事件的集合
        let bindEvent = () => {
            mui('.book-list').on('tap','.delete',function () {
                var _this = this;
                mui.alert("您确定要删除吗?",function (e) {
                    _this.parentNode.parentNode.remove(this.parentNode)
                    ajax("/api/deleteBookrack",{
                        data: {
                            id: _this.getAttribute("data-id")
                        },
                        success: function (data) {
                            mui.alert('删除成功',function (){
                                console.log(22)
                            })
                            console.log(data)
                        }
                    })
                })
            })
        }

        let render = (result) =>{
            if (!result.code) {
                console.log("您还没在书架中保存过书籍")
                return 
            }
            if (result.data.constructor === Array) {
                var frg = document.createDocumentFragment();
                result.data.forEach((item) => {
                    var li = document.createElement("li");
                    li.className = "mui-table-view-cell"
                    li.innerHTML = `<div class="mui-slider-right mui-disabled">
                                            <a class="mui-btn mui-btn-red delete" data-id="${item._id}">删除</a>
                                        </div>
                                        <div class="mui-slider-handle">
                                            <dl>
                                                <dt><img src="../images/11.jpg" alt=""></dt>
                                                <dd>
                                                    <h6 class="book-name" title="${item.bookName}">${item.bookName}</h6>
                                                    <strong class="author"><span class="mui-icon mui-icon-person"></span><em>${item.authorName}</em></strong>
                                                    <p>"豪门总裁","婚姻","暧昧"</p>
                                                </dd>
                                            </dl>
                                        </div>`
                    frg.appendChild(li)
                })
                // bookList.innerHTML = "";
                bookList.appendChild(frg);
                frg = null;
            } else {
                console.log("您发送的数据不是数组类型的")
            }
        }


        init()
    })
})