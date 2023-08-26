/**
 @Name：layui.photosPro 相册Pro组件
 */
layui.define(['laytpl'], function (exports) {
  "use strict";
  var $ = layui.$;
  var laytpl = layui.laytpl;

  //模块名
  var MOD_NAME = 'photosPro'
  //外部接口
  var photosPro = {
    config: {},
    index: layui[MOD_NAME] ? (layui[MOD_NAME].index + 10000) : 0,
    //设置全局项
    set: function (options) {
      var that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    },
    //事件监听
    on: function (events, callback) {
      return layui.onevent.call(this, MOD_NAME, events, callback);
    }
  }

  //操作当前实例
  var photosModule = function () {
    var that = this;
    var options = that.config;
    var id = options.id || that.index;

    photosModule.that[id] = that; //记录当前实例对象
    photosModule.config[id] = options; //记录当前实例配置项

    return {
      config: options,
      //重置实例
      reload: function (options) {
        that.reload.call(that, options);
      }
    }
  }


  //字符常量
  var ELEM = 'layui-modeDemo';


  //主模板
  var TPL_MAIN = ['<div class="ayui-border-box">'

    , '</div>'].join('')

  //构造器
  var Class = function (options) {
    var that = this;
    that.index = ++photosPro.index;
    that.config = $.extend({}, that.config, photosPro.config, options);
    that.render();
  };

  //默认配置
  Class.prototype.config = {
    photos: { // 图片层的数据源
      id: 0, //相册 id
      title: 'layui Photos Pro 1.0', // 相册标题
      start : 0, // 初始显示的图片序号，默认 0
      data: []
    },
    tab:null, //图片层切换后的回调
    hideFooter: false, //是否隐藏底部栏
    toolbar: true, //是否显示顶部工具栏
    thumbBar: true, //是否显示缩略图
    pullSwitch: true, //是否启用拖拽操作功能
    srcUseThumb: true, //是否src作为缩略图使用
    distance : 140 // 拖拽操作距离
  };

  //重载实例
  Class.prototype.reload = function (options) {
    var that = this;

    layui.each(options, function (key, item) {
      if (item.constructor === Array) delete that.config[key];
    });

    that.config = $.extend(true, {}, that.config, options);
    that.render();
  };

  //渲染
  Class.prototype.render = function () {
    var that = this
    var options = that.config;

    if (!options.photos) return;

    var isObject = !(typeof options.photos === 'string' || options.photos instanceof $);
    var photos = isObject ? options.photos : {};
    var data = photos.data || [];
    var start = photos.start || 0;



    console.log(options)
    that.events(); //事件
  };

  //事件
  Class.prototype.events = function () {
    var that = this;


  };


  //记录所有实例
  photosModule.that = {}; //记录所有实例对象
  photosModule.config = {}; //记录所有实例配置项

  //重载实例
  photosPro.reload = function (id, options) {
    var that = photosModule.that[id];
    that.reload(options);

    return photosModule.call(that);
  };

  //核心入口
  photosPro.render = function (options) {
    var inst = new Class(options);
    return photosModule.call(inst);
  };

  exports(MOD_NAME, photosPro);
});
