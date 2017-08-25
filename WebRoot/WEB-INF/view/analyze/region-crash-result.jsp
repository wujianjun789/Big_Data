<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String ipStr = request.getLocalAddr();
	int ipPort = request.getLocalPort();
	String ipAdress = ipStr + ":" + ipPort;
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>区域碰撞查询结果</title>
<style type="text/css"> 
.x-box-inner {
  	overflow: hidden;
	zoom: 1;
	position: left !important;
	left: 0;
	top: 0;
}
.form-lable {
 color: red;
}
.carDisIframe {
	border:1px solid #99bbe8 !important; 
}
.x-grid3-row {
  height: auto !important;
}
.x-grid3-cell-inner, .x-grid3-hd-inner { white-space:normal !important; } 
.x-grid3-header {
 	height: auto !important;
 	background: url("images/table_bg1.jpg") repeat-x scroll 0 0 transparent !important;
 	padding : 0px;
 	border-bottom: 1px solid #DBDBDB;
 	border-top: 1px solid #DBDBDB;
}
</style>
<%@ include file="/global/base-lib.jsp" %>
<script type="text/javascript"> 
	var ipAdress = "<%= ipAdress %>";
</script>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>
<!-- 日期js组件 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/regionCrashResult.js"></script>

<!-- 字典js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/Dictionary.js"></script>
<script type="text/javascript"> 
    window.dictionary  = new Dictionary();
</script>
<script id="resultScript" type="text/javascript" src=""/>
<style type="text/css"> 
	.x-form-item {
		margin-bottom: 10px;
	}
</style>
</head>
<body >	
</body>
</html>