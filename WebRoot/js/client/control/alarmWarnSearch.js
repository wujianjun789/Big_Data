/**
 * 入口
 */
Ext.ns("Jinpeng.alarmWarn");

var viewPortObj = null;
var downPictureWindow = null;
var PageSize=10;

var hh = Ext.getBody().getHeight();
var ww = Ext.getBody().getWidth();

Ext.onReady(function() {//alert("ttt3=="+document.body.clientWidth+"/"+document.body.clientHeight);
	Ext.useShims = true;
	viewPortObj = new Ext.Viewport({
		layout : 'border',
		items : [ {
			// north区域表单
			region : 'north',
			border : false,
			height : 2,
			// 自定标签
			xtype : 'alarmSearchNorthFormPanel'
		}, {
			region : 'center',
			border : false,
			//height :230,
			// 自定标签
			xtype : 'alarmSearchCenterDataPanel'
		} ]
	});
	Ext.getCmp('formPanel').alarmSearch();
	shearchDataInterval();
});

/**
 * north区域表单部份
 */
Jinpeng.alarmWarn.AlarmSearchNorthFormPanel = Ext.extend(Ext.Panel,{
		id :'formPanel',
		initComponent : function() {
			var endTime = Date.parseDate(Ext.util.Format.date(
					new Date(), 'Y-m-d')
					+ " " + "23:59:59", 'Y-m-d H:i:s');
			//车牌号
			var carNumStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/HPHMDictsInComboHPHM.mvc?code=LicPlate",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
			//车牌颜色
			var carNumColorStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=LicPlateColor",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
			//车辆类型
			var carTypeStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=CarType",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
			//处理状态
			var alarmDealStatusStore = new Ext.data.JsonStore({
						url : rootpath
								+ "/dictionary/jsonDictsInCombo.mvc?code=VerfiyMark",
						root : "data",
						fields : [ 'id', 'text' ],
						autoLoad : false
					});
			//告警类型
			var alarmTypeStore = new Ext.data.JsonStore({
				url : rootpath
						+ "/dictionary/jsonDictsInCombo.mvc?code=CarAlarmType",
				root : "data",
				fields : [ 'id', 'text' ],
				autoLoad : false
			});
			
			Ext.apply(this,{
				items : [ {
					// form表单
					xtype : 'form',
					id : 'searchAlarmForm',
					//labelAlign : 'left',
					border : false,
					frame : true,
					cls : 'blue-button-ct',
					layout : 'table',
					defaults : {
						layout : 'form',
						//统一宽度
						width : 320
					},
					layoutConfig : {
						columns : 4
					},

					bodyStyle : 'background-color: #F7F7F7;border: 1px solid #DDDDDD;padding-top:5px;',
					items : [{
								items : [ {
									xtype : 'hidden',
									name : 'startTime',
									id : 'startdate',
									allowBlank : false,
						            editable : false,
								    fieldLabel : '开始时间',
									value : new Date().format('Y-m-d') + ' 00:00:00',
									anchor : '94%',
									width:145,
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center'}
								} ]
							},{
								colspan:2,
								items : [ {
									xtype : 'hidden',
									fieldLabel : '结束时间',
									allowBlank : false,
									editable : false,
									name : 'endTime',
									id : 'enddate',
									value : new Date().format('Y-m-d') + ' 23:59:59',
									anchor : '94%',
									style: { background: '#ffffff url('+rootpath+'/js/My97DatePicker/skin/datePicker.gif) no-repeat right center',width:100} 
								} ]
							}], 
							buttons: [{
					            text: 'test',
					            handler: function(){
								}
					        }]
				} ],
				listeners : {
					afterrender : function() {
						/*车牌省Store*/
//						carNumStore.load();
//						/*车牌颜色Store*/
//						carNumColorStore.load();
//						/*车辆类型Store*/
//						carTypeStore.load();
//						/*处理类型Store*/
//						alarmDealStatusStore.load();
//						/*告警类型Store*/
//						alarmTypeStore.load();
						//Ext.getCmp('carnumcolor').setValue('1');
					}
				}
			});
			Jinpeng.alarmWarn.AlarmSearchNorthFormPanel.superclass.initComponent.apply(this);
		},
		/* 响应查询按钮 */
		alarmSearch : function() {
			//var form = Ext.getCmp('searchAlarmForm');
		//	if (form.getForm().isValid()) {
				var grid = Ext.getCmp('alarmGridPanel');
				grid.store.baseParams = {};// 重置
				/** 将参数传入后台 */
				var baseparams = {
					"startTime" : Ext.getCmp('startdate').getValue(),
					"endTime" : Ext.getCmp('enddate').getValue(),
					'sort' : 'capDate',
					'dir' : 'DESC'
				};
				grid.store.baseParams = baseparams;
				/*刷新选中*/
			//	this.publish("clearGridSelections",[]);
				grid.store.load({
					params : {
						'page.start' : 0,
						'page.limit' : PageSize
					}
				});
			//}
		},
		resetMethod :  function() {
			Ext.getCmp('searchAlarmForm').getForm().reset();
		}
	});

// 中心右区域数据显示中心
var alarmSearchStore;
Jinpeng.alarmWarn.AlarmSearchCenterDataPanel = Ext.extend(Ext.grid.GridPanel,{
		id : 'alarmGridPanel',
		border : false,
		frame : false,
		pageSize : PageSize,
		initComponent : function() {
			// 所需数据
			alarmSearchStore = new Ext.data.JsonStore({
				url : rootpath + "/controlAlarm/queryControlAlarm.mvc",
				root : 'result',
				idProperty : 'id',
				totalProperty : 'totalCount',
				autoLoad : false,
				remoteSort : true,
				fields : [ {
//						name : 'BJXXBH'
//					}, {
//						name : 'JGSK'
//					}, {
//						name : 'KKBH'
//					}, {
//						name : 'KKMC'
//					}, {
						name : 'HPHM'
					}, {
						name : 'JGSK'
					}, {
						name : 'KKMC'
//					}, {
//						name : 'CWHPYS'
//					}, {
//						name : 'HPYZ'
//					}, {
//						name : 'CLPP'
//					}, {
//						name : 'CLWX'
//					}, {
//						name : 'CSYS'
//					}, {
//						name : 'CLLX'
//					}, {
//						name : 'CLSD'
//					}, {
//						name : 'CLBJ'
//					}, {
//						name : 'BJLX'
//					}, {
//						name : 'BJDD'
//					}, {
//						name : 'QSBJ'
//					}, {
//						name : 'BJSK'
//					}, {
//						name : 'CARIMGURL'
//					}, {
//						name : 'BKHPHM'
//					}, {
//						name : 'BKCLPP'
//					}, {
//						name : 'CATEGORY'
//					}, {
//						name : 'BKSK'
//					}, {
//						name : 'BKLEN'
					}]
			});
			var sm = new Jinpeng.widget.CrosspageCheckboxSelectionMode();
			Ext.apply(this,{
				store : alarmSearchStore,
				cm : new Ext.grid.ColumnModel({
					defaults : {
						sortable : false
					},
					columns : [
						//	new Ext.ux.grid.PagingRowNumberer({width : 40}),
						//	sm,
							{
								header : '车牌号码',
								width : 60,
								dataIndex : 'HPHM'
							},{
								header : '通过时间',
								width : 80,
								dataIndex : 'JGSK',
								renderer : function(value,cellmeta,record,rowIndex,columnIndex,store) {
			       				   var tgsj = value.substring(10,value.indexOf("."));
			       				    //当文字过多的时候，鼠标移上去就给悬浮狂提示
						     	 return '<font style="font-size:15px ;" ext:qtip="'+tgsj+'">'+tgsj+'</font>';
							 }
							},{
								header : '告警地点',
								dataIndex : 'KKMC',
								width : 150,
								renderer : function(key) {
									var str = '<font style="font-size:15px ;" ext:qtip="'+key+'">'+key+'</font>';
									return str;
								}
//							},{
//								header : '告警类型',
//								dataIndex : 'BJLX',
//								renderer: function(value,cellmeta,record,rowIndex,columnIndex,store){ 
//								if(value ==null || value ==''){
//									var gjlx = '&nbsp;'; 
//									return '<font ext:qtip="'+gjlx+'">'+gjlx+'</font>';
//								}else{
//									//当文字过多的时候，鼠标移上去就给悬浮狂提示
//								     var val =window.dictionary.getValue("CarAlarmType", value); 
//							     	 return '<font ext:qtip="'+val+'">'+val+'</font>';
//						     	 }
//							   }
							} ]
				}),
		//		selModel : sm,
//				tbar : {
//					cls : 'blue-button-ct',
//					items : [ {
//						xtype : 'button',
//						id : 'exportRecordBtn',
//						titletooltip : {
//							text : Jinpeng.Message.EXPORT_BUTTON_TOOLTIP
//						},
//						text : '&nbsp;&nbsp;&nbsp;导出&nbsp;&nbsp;&nbsp;',
//						handler : this.importExcelData
//					},{
//						xtype : 'tbspacer',
//						width : 10
//					},{
//						xtype : 'button',
//						id : 'picDownloadBtn',
//						titletooltip : {
//							text : " 勾选后下载选中的图片，否则按查询条件下载！"
//						},
//						text : '图片下载',
//						handler : this.downLoadPicture
//					},{
//						xtype : 'tbspacer',
//						width : 10
//					},{
//						xtype : 'hidden',
//						id : 'sendAram',
//						text : '联网告警',
//						handler : this.sendAlarm2MQ
//					},{
//						xtype : 'tbspacer',
//						width : 10
//					},{
//						xtype : 'hidden',
//						id : 'sendControl',
//						text : '智能封控',
//						handler : this.sendControl2MQ
//					}]
//				},
				bbar : new Jinpeng.widget.PagingToolbar( {
					id : 'PagingToolbar',
					store : alarmSearchStore,
					//displayInfo : true,
					pageSize : this.pageSize,
					displayMsg : '{0} - {1} of 共{2}条',
					emptyMsg : "无数据"
				}),
				listeners : {
					afterrender : function() {
						//页面初始数据需要按当前查询条件
//						alarmSearchStore.baseParams["startTime"] = Date.parseDate(Ext.util.Format
//								.date(new Date(), 'Y-m-d')
//								+ " " + "00:00:00", 'Y-m-d H:i:s');
//						alarmSearchStore.baseParams["endTime"] = Date.parseDate(Ext.util.Format
//								.date(new Date(), 'Y-m-d')
//								+ " " + "23:59:59", 'Y-m-d H:i:s');
//						alarmSearchStore.load({
//							params : {
//								'page.start' : 0,
//								'page.limit' : this.pageSize
//							}
//						});
					},
//					/*双击查看*/
//					rowdblclick : function(grid, rowIndex, e ) {
//						var data = grid.getStore().getAt(rowIndex).data;
//						var win = new Jinpeng.alarmWarn.CheckShowDetailWindow();
//						//将ID设置到弹出框win的属性中，用于win完成渲染后加载数据。
//						win.loadId = data.BJXXBH;
//						win.show();
//					},
					/*排序点击事件*/
					headerclick : function ( grid, columnIndex, e) {
						var dataIndex = grid.colModel.columns[columnIndex].dataIndex;
						//屏蔽操作列和空列的点击事件
						if ("" == dataIndex || 'operate' == dataIndex) {
							return;
						}
						alarmSearchStore.baseParams['advancedSearch.sort'] = dataIndex;
						if (alarmSearchStore.baseParams['advancedSearch.dir'] == 'DESC') {
							alarmSearchStore.baseParams['advancedSearch.dir'] = 'ASC';
						} else {
							alarmSearchStore.baseParams['advancedSearch.dir'] = 'DESC';
						}
						alarmSearchStore.load({
							params : {
								'page.start' : 0,
								'page.limit' : 10
							}
						});
					}
				}
			});
			//最后一列查看点击事件 
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				var fieldName = grid.getColumnModel()
						.getDataIndex(columnIndex);
				if (fieldName == 'operate') {
					if (typeof this.checkHref == 'function')
						//超链接方法 
						this.checkHref(grid, rowIndex, columnIndex);
				}
			});
			/*
			this.on('cellclick',function(grid, rowIndex, columnIndex, e) {
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
				var orgId = '';
				var orgType = '';
				var kkbhs = '';
				var startTime = Ext.getCmp('startdate').getValue();
				var endTime = Ext.getCmp('enddate').getValue();
				var recode = grid.store.getAt(rowIndex);
				var carNum = recode.get("HPHM");
				var mainParam = {
					'orgId' : orgId,
					'orgType' : orgType,
					'kkbhs' : kkbhs,
					'startTime' : startTime,
					'endTime' : endTime,
					'carNum' : carNum,
					'counts' : recode.data.passTimes
				};
				//alert("hello!!!");
				//alert(recode.data.passTimes);
				if (fieldName=='HPHM') {
					
					var win = new Jinpeng.carFrequency.CarFrequencyWindow({
						cls : 'system_mod',
						modal : true
					});
					win.init(mainParam);
					win.show();
					
				}
			});
			*/
			Jinpeng.alarmWarn.AlarmSearchCenterDataPanel.superclass.initComponent.apply(this);
		},
		//超链接的方法 
		checkHref : function(grid, rowIndex, colIndex, item, event) {
			var recode = grid.store.getAt(rowIndex);
			if (recode) {
				// 创建window窗体
				var win = new Jinpeng.alarmWarn.CheckShowDetailWindow();
				win.loadId = recode.get("BJXXBH");// 唯一序列号
				win.show();
			}
		},
		//下载图片
		downLoadPicture : function() {
			if (Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections()=='') {
				var win = new Jinpeng.widget.MessageWindow();
				win.msg = '请勾选需要下载图片的记录！';
				win.show();
			}else{
				linkDownloadPicture();
			}
			
			
		},
		//导出Excel格式数据方法 
		importExcelData : function() {
			var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
			var config = {
				totalURL : rootpath + "/controlAlarm/countControlAlarm.mvc",
				selectExportURL : rootpath + "/controlAlarm/exportControlAlarm.mvc",
				queryExportURL : rootpath + "/controlAlarm/exportControlAlarm.mvc"
			};
			// 得到选中的ids
			var ids = [];
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('BJXXBH');
			}
			config.ids = ids;
			var param = getQueryParams();
			config.queryCondition = param.join("&");
			var ExportHelper = new Jinpeng.ExportHelper(config);
			ExportHelper.startExport(true);
		},
		sendAlarm2MQ:function(){
			var records =Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
			if(records.length<=0){
				alert("请先选择联网告警信息，谢谢！");
				return;
			}
			var amq = org.activemq.Amq;
			for(var i=0;i<records.length;i++){
				var alarmObj=records[i];
				var kkbh=alarmObj.get("KKBH");
				 //alert("kkbh==="+kkbh);
				var params = {'kkbh': kkbh};
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath+'/deviceinfo/findDeviceByKkbh.mvc',
					method : 'POST',
					params : params,
					success : function(resp, opts) {
						var o = resp.responseData || Ext.decode(resp.responseText);
						var result=o.data;//alert(result.kkmc+"/"+result.jd+"/"+result.wd);
						alarmObj.kkmc=result.kkmc;
						alarmObj.longitude=result.jd;
						alarmObj.latitude=result.wd;
						alarmObj.deviceNum=result.deviceNum;
						var message=getAlarmMqMsg(alarmObj);
						//alert(message);
						amq.sendMessage("topic://AlarmTopic",message);
						//amq.sendMessage("topic://\/topic/interactive",message);
						//alert("告警信息发送成功!");
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "获取设备信息失败";
						win.show();
					},
					scope : this
				});
			}
			Ext.getCmp('alarmGridPanel').getSelectionModel().clearSelections();
		},
		sendControl2MQ:function(){
			var records =Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
			if(records.length<=0){
				alert("请先选择智能封控信息，谢谢！");
				return;
			}
			var amq = org.activemq.Amq;
			for(var i=0;i<records.length;i++){
				var alarmObj=records[i];
				var kkbh=alarmObj.get("KKBH");
				var params = {'kkbh': kkbh};
				Ext.Ajax.request({
					// 将id组合成字符串传递到后台
					url : rootpath+'/deviceinfo/findDeviceByKkbh.mvc',
					method : 'POST',
					params : params,
					success : function(resp, opts) {
						var o = resp.responseData || Ext.decode(resp.responseText);
						var result=o.data;
						
						var message='{"action":"312","data":{"deviceNum":"'+result.deviceNum
									+'","longitude":"'+result.jd
									+'","latitude":"'+result.wd
									+'","area": "1000"}}';
						//alert(message);
						amq.sendMessage("topic://AlarmTopic",message);
						//amq.sendMessage("topic://\/topic/interactive",message);
						//alert("封控信息发送成功!");
					},
					failure : function(resp, opts) {
						var win = new Jinpeng.widget.MessageWindow();
						win.msg = "获取设备信息失败";
						win.show();
					},
					scope : this
				});
			}
			Ext.getCmp('alarmGridPanel').getSelectionModel().clearSelections();
		}
	});

/**
 * 告警详细信息Store
 */
var alarmDetailStore = new Ext.data.JsonStore({
	url : rootpath + "/controlAlarm/alarmControlDetail.mvc",
	root :  'data',
    idProperty : 'id',
    totalProperty : 'total',
    autoLoad : false
});

/**
 * 弹出窗口显示违章详细信息
 */
Jinpeng.alarmWarn.CheckShowDetailWindow = Ext.extend(Jinpeng.widget.GeneralWindow,{
		width : 970,
		height : 500,
		title : '告警详细信息',
		closeAction : "close",
		plain : true,
		modal : true,
		border : false,
		loadId : '',
		initComponent : function() {
			Ext.apply(this,{
				items : [ {
					xtype : 'form',
					region : 'center',
					id : 'alarmDetailForm',
					layout : 'column',
					labelAlign : 'right',
					cls:'blue-button-ct',
					border : false,
					items : [ {
						//左边图片显示区域 
						columnWidth : .45,
						items : [ {
							//引用图片显示组件
							xtype : 'pictureShowBox',
							width : 420,
							height : 420
						} ]
					}, {
						/* 右边车辆信息和布控信息显示 */
						columnWidth : .55,
						layout : 'form',
						items : [ {
							/* 车辆信息显示 */
							xtype : 'fieldset',
							title : '车辆信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 250,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [{
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌号码',
									id : 'carNum',
									name : 'carNum',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '通过时间',
									name : 'capDate',
									id : 'capDate',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车牌颜色',
									name : 'carNumColor',
									id : 'carNumColor',
									anchor : '96%'
								} ]
							}, {}/*, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '车辆类型',
									name : 'carType',
									id : 'carType',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '卡口方向',
									name : 'fxbh',
									id : 'fxbh',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'compositefield',
									anchor : '96%',
									items : [{
											flex : 0.5,
											xtype : 'displayfield',
											fieldLabel : '速度',
											name : 'carSpeed',
											id : 'carSpeed'
										}, {
											flex : 0.5,
											xtype : 'displayfield',
											value : '公里/小时'
										} ]
								} ]
							}*/, {
								colspan : 2,
								width : 520,
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '告警地点',
									name : 'devChnName',
									id : 'devChnName',
									anchor : '96%'
								} ]
							}, {
								items : [{
									xtype : 'hidden',
									id : 'xxbh',
									name : 'xxbh'
								}]
							} ]
						}, {
							/* 布控信息显示区域 */
							xtype : 'fieldset',
							title : '布控信息',
							layout : "table",
							bodyStyle : 'padding-top : 5px;',
							defaults : {
								width : 250,
								layout : 'form'
							},
							layoutConfig : {
								columns : 2
							},
							items : [ {
								items : [ {
									xtype : 'displayfield',
									id : 'surveyOrgName',
									name : 'surveyOrgName',
									fieldLabel : '布控单位',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '布控人',
									id : 'surveyUreaName',
									name : 'optUser',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '布控时间',
									id : 'surveyDate',
									name : 'surveyDate',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '联系单位',
									id : 'linkOrg',
									name:'linkOrg',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '联系人',
									id : 'linkMMan',
									name : 'linkMMan',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '联系电话',
									id : 'linkPPhone',
									name : 'linkPPhone',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '布控等级',
									id : 'alarmTypeName',
									name : 'alarmTypeName',
									anchor : '96%'
								} ]
							}, {
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '布控类型',
									id : 'surveyTypeName',
									name : 'surveyTypeName',
									anchor : '96%'
								} ]
							}, {
								colspan : 2,
								width : 520,
								items : [ {
									xtype : 'displayfield',
									fieldLabel : '简要案情',
									id : 'surveyDescrible',
									height : 35,
									name : 'surveyDescrible',
									anchor : '96%'
								} ]
							} ]
						},{
							/* 布控信息显示区域 */
							xtype : 'fieldset',
							title : '告警处理信息',
							id : 'processArea',
							defaults : {
								layout : 'form'
							},
							items : [ {
								items : [{
									xtype : 'displayfield',
									fieldLabel : '处理详情',
									id : 'processDescribe',
									height : 50,
									name : 'processDescribe',
									anchor : '96%'
								}]
							} ]
						}]
					} ],
					bbar : {
						buttonAlign : 'center',
						buttons : [{
							xtype : 'button',
							text : '上一条',
							id : 'prevButton',
							scope : this,
							handler : function() {
								// 调用方法获取下一条记录id
								var id = this.getDetailRecordId(this.loadId, false);
								// 如果不为空，则进行数据加载
								if (id != null) {
									this.loadDetailById(id);
									//同步"上一条","下一条"按钮状态.
									this.synchronUpOrDown(id);
								}
							}
						},{
							xtype : 'tbspacer',
							width : 10
						},{
							xtype : 'button',
							text : '下一条',
							id : 'nextButton',
							scope : this,
							handler : function() {
								// 调用方法获取下一条记录id
								var id = this.getDetailRecordId(this.loadId, true);
								// 如果不为空，则进行数据加载
								if (id != null) {
									this.loadDetailById(id);
									//同步"上一条","下一条"按钮状态.
									this.synchronUpOrDown(id);
								}
							}
						},{
			          		  xtype : 'tbspacer',
			          		  width : 10
		          	  	},{
		          	  		xtype : 'button',
							text : '下载图片',
							id : 'picdownloadbtn',
							handler : function() {
								//获取当前记录的id
								var id = Ext.getCmp('xxbh').getValue();
								//根据Id下载图片
								linkDownloadPicture(id);
								
								
							}
						}, {
							xtype : 'tbspacer',
							width : 10
						}, {
							xtype : 'button',
							text : '&nbsp;&nbsp;&nbsp;关闭&nbsp;&nbsp;&nbsp;',
							id : 'closeBtn',
							scope : this,
							handler : this.close
						} ]
					}
				} ]
			});
			Jinpeng.alarmWarn.CheckShowDetailWindow.superclass.initComponent.apply(this);
		},
		afterRender : function() {
			Jinpeng.alarmWarn.CheckShowDetailWindow.superclass.afterRender.call(this);
			//根据点击记录时设置的记录ID加载数据
			this.loadDetailById(this.loadId);
			//同步"上一条","下一条"按钮状态.
			this.synchronUpOrDown(this.loadId);
			//权限控制
			this.privilegeControl_window();
		},
		//加载数据
		loadDetailById : function(id) {
			alarmDetailStore.load({
				params : {'id' : id},
				scope : this,
				callback : function(records, options, success) {
					record = alarmDetailStore.reader.jsonData.data[0];
					//将数据加载到form表单中
					Ext.getCmp("xxbh").setValue(record.BJXXBH);
					Ext.getCmp('carNum').setValue(record.HPHM);
					//Ext.getCmp('capDate').setValue(record.JGSK.substring(0,record.JGSK.indexOf(".")); 
					Ext.getCmp('capDate').setValue(record.JGSK.substring(0,record.JGSK.indexOf(".")));
					Ext.getCmp('carNumColor').setValue(window.dictionary.getValue("LicPlateColor", record.HPYS));
					//Ext.getCmp('carType').setValue(window.dictionary.getValue("CarType", record.CLLX));
					//Ext.getCmp('fxbh').setValue(window.dictionary.getValue("DIRECTION_TYPE",record.FXBH));//卡口方向DIRECTION_TYPE
					//Ext.getCmp('carSpeed').setValue(record.CLSD);
					Ext.getCmp('devChnName').setValue(record.KKMC);
					Ext.getCmp('surveyOrgName').setValue(record.BKDW);
					Ext.getCmp('surveyUreaName').setValue(record.BKR);
					//Ext.getCmp('surveyDate').setValue(record.BKSK);
					if (record.BKSK) {
						Ext.getCmp('surveyDate').setValue(record.BKSK.substring(0,record.BKSK.indexOf(".")));
					}
					//Ext.getCmp('linkOrg').setValue(record.CZ);
					Ext.getCmp('linkMMan').setValue(record.CZ);//联系人
					//Ext.getCmp('linkMMan').setValue(record.LXR);//联系人
					Ext.getCmp('linkPPhone').setValue(record.LXDH);
					Ext.getCmp('alarmTypeName').setValue(window.dictionary.getValue("ControlLevel", record.BKJB));
					Ext.getCmp('surveyTypeName').setValue(window.dictionary.getValue("ControlType", record.BKLB));
					Ext.getCmp('surveyDescrible').setValue(record.AJMS);
					Ext.getCmp('processDescribe').setValue(record.BZ);
					//展示处理信息
					this.setProcessDescribe(record);
					//将加载地址publish
					//this.publish('loadPictures', rootpath+ "/client/check/getPicWantedById.action?wantedid="+ id);
					this.publish('loadPictures', record);
				}
			});
		},
		/**
		 * 当前告警记录处理信息展示
		 * @param data
		 */
		setProcessDescribe : function(data) {
			var PROCESS_RECORD_TPL = '';
			//未签
			if (0 == data.alarmDealStatus) {
				PROCESS_RECORD_TPL = '未签收';
			}
			//已签收
			if (data.alarmDealStatus >= 1) {
				PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====签收栏====\r\n\r\n签收人：{0}，签收时间：{1}\r\n\r\n";
			}
			//已确认
			if (data.alarmDealStatus >= 2) {
				PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====确认栏====\r\n\r\n确认人：{2}，确认时间：{3}\r\n确认意见：{4}\r\n\r\n";
			}
			//已取消
			if (data.alarmDealStatus == 3) {
				PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + '***已取消告警***';
			}
			//已处理
			if (data.alarmDealStatus >= 4) {
				PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====处理栏====\r\n\r\n处理人：{5}，处理时间：{6}\r\n处理动作：{7}\r\n处理意见：{8}\r\r\n";
			}
			//已反馈	
			if (data.alarmDealStatus >= 5) {
				PROCESS_RECORD_TPL = PROCESS_RECORD_TPL + "====反馈栏====\r\n\r\n反馈人：{9}，反馈时间：{10}\r\n反馈意见：{11}";
			}
			Ext.getCmp("processDescribe").setValue(String.format(PROCESS_RECORD_TPL, 
					data.signPersonName, data.signTime, 
					data.confirmPersonName, data.confirmTime, (data.confirmSuggest == null ? '无' : data.confirmSuggest), 
					data.processPersonName, data.processTime, 
					window.dictionary.getValue("ALARM_PROCESS_ACTION", data.processAction),
					(data.processSuggest == null ? '无' : data.processSuggest),
					data.feedbackPersonName,data.feedbackTime,data.feedbackContent));
		},
		/**
		 * 计算点击"上一条","下一条"按钮后，记录Id。
		 * @param id
		 * @param upOrDown
		 * @returns
		 */
		getDetailRecordId : function(id, upOrDown) {
			var nextId = null;
			//拿该数据在当前store中的id数组所在的序号
			var k = 0;
			for ( var i = 0; i < alarmSearchStore.getCount(); i++) {
				if (this.loadId == alarmSearchStore.getAt(i).get('BJXXBH')) {
					k = i;
					break;
				}
			}
			if (upOrDown == false && k > 0) {
				nextId = alarmSearchStore.getAt(k - 1).get('BJXXBH');
			}
			if (upOrDown == true
					&& k < alarmSearchStore.getCount() - 1) {
				nextId = alarmSearchStore.getAt(k + 1).get('BJXXBH');
			}
			if(nextId) {
				this.loadId = nextId;
			}
			return nextId;
		},
		/**
		 * 同步"上一条","下一条"按钮状态.
		 */
		synchronUpOrDown : function(id) {
			var count = alarmSearchStore.getCount();
			var index = 0;
			for ( var i = 0; i < count; i++) {
				if (id == alarmSearchStore.getAt(i).get('BJXXBH')) {
					index = i;
					break;
				}
			}
			//更改状态
			if (count == 1) {
				Ext.getCmp('nextButton').disable();
				Ext.getCmp('prevButton').disable();
			} else if(index == 0) {
				Ext.getCmp('prevButton').disable();
				if(count == 2) {
					Ext.getCmp('nextButton').enable();
				}
			} else if (index == (count-1)) {
				Ext.getCmp('nextButton').disable();
				if(count == 2) {
					Ext.getCmp('prevButton').enable();
				}
			} else {
				Ext.getCmp('prevButton').enable();
				Ext.getCmp('nextButton').enable();
			}
		},
		/**
		 * 下载，布控权限控制
		 */
		privilegeControl_window : function() {
			/*picRight = getRight("PictureLoad"); //图片下载权
			if(picRight) {
				Ext.getCmp('picdownloadbtn').setDisabled(false);
			};*/
		}
	});

//下载图片方法
function linkDownloadPicture(id){
	var ids=[];
	if(id){
		ids[ids.length]=id;
	}else{
		var records = Ext.getCmp('alarmGridPanel').getSelectionModel().getSelections();
		if (records != "") {
			for ( var i = 0; i < records.length; i++) {
				ids[ids.length] = records[i].get('BJXXBH');
			}
		}
	}
	var idString = ids ? ids.join(',') : '';
	if(idString!=''){
		Ext.Ajax.request({
				// 将id组合成字符串传递到后台
				url : rootpath +'/controlAlarm/loadImgUrlByIds.mvc',
				method : 'POST',
				params : {'idstr': idString},
				success : function(resp, opts) {
					var txt = Ext.util.JSON.decode(resp.responseText);
					//var data = txt.data;
					if(txt){
						window.open (txt,'_black');
						//downPictureWindow.close();
					}
				},
				failure : function(resp, opts) {
					var win = new Jinpeng.widget.MessageWindow();
					win.msg = "下载失败！请重试！";
					win.show();
				}
			});
	}
	
}

//获取当前查询条件参数，并封装为数组
function getQueryParams() {
	//将查询参数传递到后台，并在后台获取要导出的数据 
	var param = [];
	param[param.length] = "carFNum=" +  (Ext.get('carfnum').getValue() =='全部'? '': Ext.get('carfnum').getValue());
	param[param.length] = "carBNum=" + Ext.getCmp('carbnum').getValue();
	param[param.length] = "carNumColor=" + (Ext.getCmp('carnumcolor').getValue() == '' ? -1 : Ext.getCmp('carnumcolor').getValue());
	param[param.length] = "carType=" + (Ext.getCmp('cartype').getValue() == '' ? -1 : Ext.getCmp('cartype').getValue());
	param[param.length] = "passStation=" + Ext.getCmp('passport').getValue();
	param[param.length] = "startTime=" + Ext.getCmp('startdate').getValue(),//Ext.util.Format.date(Ext.getCmp('startdate').getValue(),'Y-m-d H:i:s');
	param[param.length] = "endTime=" + Ext.getCmp('enddate').getValue(), // Ext.util.Format.date(Ext.getCmp('enddate').getValue(),'Y-m-d H:i:s');
	//param[param.length] = "alarmDealStatus=" + (Ext.getCmp('alarmdealstatus').getValue() == '' ? -1 : Ext.getCmp('alarmdealstatus').getValue());
	param[param.length] = "alarmType=" + (Ext.getCmp('alarmType').getValue() == '' ? -1 : Ext.getCmp('alarmType').getValue());
	param[param.length] = 'sort=' +alarmSearchStore.baseParams['sort'];
	param[param.length] = 'dir=' +alarmSearchStore.baseParams['dir'];
	return param;
}

function getAlarmMqMsg(alarmObj){
	var msg='{	"action": "202",'
			 +   '"data": {'
			 +		'"flag":"B01",'
			 +	    '"bjxxbh":"",'
			 +	    '"bkxxbh":"'+alarmObj.get("BJXXBH")+'",'
			 +	    '"hphm":"'+alarmObj.get("HPHM")+'",'
			 +	    '"passtime":"'+alarmObj.get("JGSK")+'",'
			 +	    '"kkbh":"'+alarmObj.deviceNum+'",'
			 +	    '"bjlx":"布控告警",'
			 +	    '"tx1":"'+alarmObj.get("CARIMGURL")+'",'
			 +	    '"bjsk":"'+alarmObj.get("BJSK")+'",'
			 +	    '"lxdh":"",'
			 +	    '"kkmc":"'+alarmObj.kkmc+'",'
			 +	    '"dxfsbs":"",'
			 +	    '"direction":"",'
			 +	    '"lane":"",'
			 +	    '"clxxbh":"",'
		     +		'"longitude":"'+alarmObj.longitude+'",'
			 +		'"latitude":"'+alarmObj.latitude+'"'
			 +		'}}';
			return msg;

	};
function decodeUTF8(str){
	return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){  
	    return String.fromCharCode(parseInt($2,16));  
	});
}

function shearchDataInterval(){
	var tastTime = setInterval(function() {
		Ext.getCmp('formPanel').alarmSearch();
	},30000);
}

Ext.reg('alarmSearchNorthFormPanel', Jinpeng.alarmWarn.AlarmSearchNorthFormPanel);
Ext.reg('alarmSearchCenterDataPanel', Jinpeng.alarmWarn.AlarmSearchCenterDataPanel);