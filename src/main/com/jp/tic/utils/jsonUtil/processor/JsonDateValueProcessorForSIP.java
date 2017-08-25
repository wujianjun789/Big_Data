package com.jp.tic.utils.jsonUtil.processor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

/**
 * @类功能说明:json日期值处理器 (java转化为JSON)(SIP专用，转化为“2013-12-22T23:34:56”格式)
 * @创建人:王晓东
 * @创建时间: 2013-8-7下午02:31:15
 */
public class JsonDateValueProcessorForSIP implements JsonValueProcessor {

	private String format = "yyyy-MM-dd HH:mm:ss";

	public JsonDateValueProcessorForSIP() {

	}

	public JsonDateValueProcessorForSIP(String format) {
		this.format = format;
	}

	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		return process(value, jsonConfig);
	}

	public Object processObjectValue(String key, Object value,
			JsonConfig jsonConfig) {
		return process(value, jsonConfig);
	}

	private Object process(Object value, JsonConfig jsonConfig) {
		if (value instanceof Date) {
			String str = new SimpleDateFormat(format).format((Date) value);
			str = str.replace(" ", "T");
			return str;
		}
		if (value instanceof Timestamp) {
			String str = new SimpleDateFormat(format).format((Timestamp) value);
			str = str.replace(" ", "T");
			return str;
		}
		return value == null ? null : value.toString();
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

}
