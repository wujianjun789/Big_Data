package com.jp.tic.business.user.dao;import java.util.List;import java.util.Map;import javax.servlet.http.HttpServletRequest;import com.jp.tic.system.entity.UserLog;public interface UserDao {	/**	 * 	 * 获取当前用户信息	 * 	 * @param param查询参数	 * 	 * @return 查询结果。	 */	public Map<String, Object> getCurrentUser(HttpServletRequest request);		/**	 * 	 * 保存用户日志操作信息	 * 	 * @param userLog	 *            userLog对象	 * 	 * @return 操作结果	 */	public int saveUserInfo(UserLog userLog);		public void startSay();		public void endSay();		public void saveUserTest();		/**	 * 	 * 密码修改，检查输入的原始密码是否与数据库中的密码一致	 * 	 * @param param	 *            查询参数	 * 	 * @return 返回结果	 */	public List<Map<String, String>> checkPasswordInfo(Map<String, String> param);		/**	 * 	 * 修改用户密码	 * 	 * @param param	 *            查询参数	 * 	 * @return 返回结果	 */	public int updatePasswordInfo(Map<String, String> param);		/**	 * 	 * 根据用户账户和用户名查询用户信息	 * 	 * @param userCode	 *            用户账号	 * 	 * @return 查询结果	 * 	 * @throws Exception	 *             异常	 */	public List<Map<String, String>> findUserInfo(String userCode)			throws Exception;		/**	 * 	 * 通过用户获取用户组织结构关系表中的数据	 * 	 * @param orgCode	 *            组织ID	 * 	 * @return 查询结果	 * 	 * @throws Exception	 *             异常	 */	public List<Map<String, String>> findOrgByOrgCodeInfo(String orgCode)			throws Exception;		/**	 * 	 * 添加KPI用户信息	 * 	 * @param param	 *            查询参数	 * 	 * @return 返回结果	 */	public int addKPIUserInfo(Map<String, String> param);		/**	 * kpi用户登录系统，更新用户信息	 * @param param 参数	 * @return 更新结果	 */	public int updateKPIUserInfo(Map<String, String> param);		/**	 * 获取所有的菜单数据	 * @return	 * @throws Exception	 */	public List<Map<String, String>> findActionsInfo();		/**	 * 获取用户所有的菜单数据	 * @return	 * @throws Exception	 */	public List<Map<String, String>> findMenusInfo(String user_codesss) throws Exception;}