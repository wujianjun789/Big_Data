package com.jp.tic.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jp.tic.system.dao.SystemConfigDao;
import com.jp.tic.system.service.SystemConfigService;

/**
 * 系统配置表对应类
 * @author lsg
 *
 */

@Service
public class SystemConfigServiceImpl implements SystemConfigService {

	@Autowired
	SystemConfigDao systemConfigDao;
	
	/**
	 * 数据不多，一次性加载所有的系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllConfigDatas() {
		return systemConfigDao.findAllConfigDatas();
	}
	
	/**
     * 加载配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> loadAlarmSettingInfo() {
		return systemConfigDao.loadAlarmSettingInfo();
	}
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int saveOrUpdateAlarmSettingInfo(Map<String, String> param) {
		return systemConfigDao.saveOrUpdateAlarmSettingInfo(param);
	}
	
	/**
	 * 更新是否启用报警设置复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateTroubleCheck(Map<String, String> param) {
		return systemConfigDao.updateTroubleCheck(param);
	}
	
	/**
     * 查询操作日志配置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findOperationLogConfig() {
		return systemConfigDao.findOperationLogConfig();
	}
	
	/**
	 * 保存或者更新设置信息
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationSettingInfo(Map<String, String> param) {
		return systemConfigDao.updateOperationSettingInfo(param);
	}
	
	/**
	 * 更新是否启用操作类型复选框值
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOperationCheck(Map<String, String> param) {
		return systemConfigDao.updateOperationCheck(param);
	}
	
	/**
     * 根据code查询配置信息
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findConfigByCode(String code) {
		return systemConfigDao.findConfigByCode(code);
	}
	
	/**
     * 查询已启用操作日志
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findUsingLogConfig() {
		return systemConfigDao.findUsingLogConfig();
	}
	
	/**
	 * 更新首页展示方式标识
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFirstPanelFlag(Map<String, String> param) {
		systemConfigDao.updateUserConfigFlag(param);
		return systemConfigDao.updateFirstPanelFlag(param);
	}
	
	/**
	 * 更新卡口在线状态时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateOnlineStateTime(Map<String, String> param) {
		return systemConfigDao.updateOnlineStateTime(param);
	}
	
	/**
	 * 历史首页过车查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateCarTime(Map<String, String> param) {
		return systemConfigDao.updateCarTime(param);
	}
	
	/**
	 * 更新首页告警查询时间
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateAlarmTime(Map<String, String> param) {
		return systemConfigDao.updateAlarmTime(param);
	}
	
	/**
	 * 假牌车分析一次分析的最大数据量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeCounts(Map<String, String> param) {
		return systemConfigDao.updateFakeCounts(param);
	}
	
	/**
	 * 假牌车分析分析一次的时间长度
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateFakeTimes(Map<String, String> param) {
		return systemConfigDao.updateFakeTimes(param);
	}
	
	/**
     * 查询系统配置的假牌查询最大数据量
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeCounts() {
		return systemConfigDao.findFakeCounts();
	}
	
	/**
     * 查询系统配置的假牌查询的时间设置
     * @return 查询结果
     * @author lsg
     */
	public List<Map<String, String>> findFakeTimes() {
		return systemConfigDao.findFakeTimes();
	}
	
	/**
	 * 临近点分析一次性读取hbase数据总量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateClosetLimit(Map<String, String> param) {
		return systemConfigDao.updateClosetLimit(param);
	}
	
	/**
	 * 卡口在线状态查询单线程分配的卡口数量
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateStatuNumber(Map<String, String> param) {
		return systemConfigDao.updateStatuNumber(param);
	}
	
	/**
	 * 更新历史过车查询方式状态
	 * @param param 请求参数
	 * @return 保存结果
	 */
	public int updateHistoryFlag(Map<String, String> param) {
		return systemConfigDao.updateHistoryFlag(param);
	}
	
	/**
	 * 数据不多，一次性加载所有的昼伏夜出系统配置信息
	 * @return 查询结果
	 */
	public List<Map<String, String>> findAllNightAndDazedDatas() {
		return systemConfigDao.findAllNightAndDazedDatas();
	}

	/**
	 * 获取饱和度
	 * @return
	 */
	public List<Map<String, String>> getSaturations() throws Exception{
		return systemConfigDao.getSaturations();
	}
}
