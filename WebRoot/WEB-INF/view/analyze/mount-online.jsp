<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="ui" uri="/WEB-INF/tlds/ui.tld"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>卡口在线统计</title>
<%@ include file="/global/base-lib.jsp" %>
<!-- 所需js包 -->
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/toolBox.js"></script>

<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/control/TreeComboField.js"></script>
<script type="text/javascript"	src="${pageContext.request.contextPath}/js/client/analyze/mountOnline.js"></script>

</head>
<body >	
</body>
</html>