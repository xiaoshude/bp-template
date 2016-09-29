/**
 * @file bp后台公共模块接口开发
 */

export default {
	/**
	 * @method getHeader
	 * @desc 获取头部展示信息
	 */
	getHeader() {
		var data = {
			"last5LoginIp":
			[
				{
					"id":"65927",
					"uid":"199",
					"login_time":"34\u5206\u949f\u524d",
					"login_ip":"10.77.131.11, 1"
				},
				{
					"id":"65839",
					"uid":"199",
					"login_time":"02-05",
					"login_ip":"10.77.131.11, 1"
				},
				{
					"id":"65682",
					"uid":"199",
					"login_time":"02-04",
					"login_ip":"0.0.0.0"
				},
				{
					"id":"65649",
					"uid":"199",
					"login_time":"02-04",
					"login_ip":"0.0.0.0"
				},
				{
					"id":"65517",
					"uid":"199",
					"login_time":"02-03",
					"login_ip":"0.0.0.0"
				}
			],
			"userName":"13691070811",
			"groupName":"\u8d85\u7ea7\u7ba1\u7406\u5458\u6743\u9650\u7ec4",
			"auth_range":"\u98de\u51e1\u5e73\u53f0"
		}
		return data;
	},
	getSearch(obj){
		var data =
		[
			{	
				"id":110100,
				"name":"\u5317\u4eac\u5e02",
				"type":"city"
			},
			{"id":110200,"name":"\u5317\u4eac\u53bf","type":"city"},
			{"id":1000265,"name":"\u5317\u4eac\u77f3\u666f\u5c71\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},
			{"id":1000772,"name":"\u5317\u4eac\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a\u52ff\u52a8\u65b0\u5efa\u7acb\u6570\u636e","type":"plaza"},
			{"id":1000822,"name":"\u5317\u4eacCBD\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},
			{"id":1000823,"name":"ydb\u5317\u4eac\u6d4b\u8bd5\u5546\u5708","type":"plaza"},
			{"id":1000825,"name":"\u5317\u4eacCBD\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},
			{"id":1000831,"name":"\u5317\u4eaccbd\u4e07\u8fbe\u5e7f\u573a\u6d4b\u8bd5\u7535\u5f71","type":"plaza"},
			{"id":1000833,"name":"\u5317\u4eac\u65b0\u5efa\u4e0a\u7ebf\u5546\u5708","type":"plaza"},
			{"id":1000839,"name":"\u5317\u4eac\u5927\u5174\u4eac\u826f\u8def","type":"plaza"},
			{"id":1000862,"name":"\u5317\u4eac\u5e02\u65b0\u589e\u5546\u5708\uff0c\u6709\u5e7f\u573a\u95e8\u5e97","type":"plaza"},
			{"id":1000864,"name":"\u65b0\u589e\u5546\u5708\uff0c\u5317\u4eac\u7684\u54e6","type":"plaza"},
			{"id":1000867,"name":"\u5317\u4eac\u81ea\u52a8\u6d4b\u8bd5\u5e7f\u573a","type":"plaza"},
			{"id":1000904,"name":"\u5317\u4eac\u67d0\u67d0\u5546\u5708","type":"plaza"},
			{"id":1000909,"name":"\u5317\u4eac\u5927\u73a9\u5bb6\u6d4b\u8bd5\u5546\u5708","type":"plaza"},
			{"id":1000911,"name":"\u5317\u4eac\u5927\u73a9\u5bb6\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1000941,"name":"\u5317\u4eacapp630\u6d4b\u8bd5\u5546\u5708","type":"plaza"},{"id":1000959,"name":"\u5317\u4eac\u7231\u7434\u6d77\u5e7f\u573a","type":"plaza"},{"id":1000985,"name":"\u5317\u4eac\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1000986,"name":"\u5317\u4eac\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a3333","type":"plaza"},{"id":1001006,"name":"\u5317\u4eac\u82b1\u5343\u9aa8\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1001009,"name":"\u5317\u4eacxstest\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1001012,"name":"\u5317\u4eac\u671d\u9633123\u8d2d\u7269\u5e7f\u573a","type":"plaza"},{"id":1001014,"name":"\u7231\u7434\u6d77\u5317\u4eac\u5e7f\u573a","type":"plaza"},{"id":1001017,"name":"\u5317\u4eac\u5927\u671b\u8def\u91d1\u5730\u5e7f\u573a","type":"plaza"},{"id":1001019,"name":"\u5317\u4eac\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a4444","type":"plaza"},{"id":1001022,"name":"\u5317\u4eac\u7231\u7434\u6d77\u5e7f\u573a2","type":"plaza"},{"id":1001023,"name":"\u5317\u4eac\u901a\u5dde\u4e07\u8fbe\u5e7f\u573a-\u52ff\u52a82","type":"plaza"},{"id":1001029,"name":"syf\u65b0\u5efa\u4e07\u8fbe\u96c6\u56e2\u5546\u5708-\u5317\u4eac","type":"plaza"},{"id":1001030,"name":"\u5317\u4eac\u5c0f\u98de\u5229\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1001083,"name":"\u5317\u4eac\u901a\u5dde\u533a\u6d4b\u8bd5test\u5e7f\u573a","type":"plaza"},{"id":1001084,"name":"\u5317\u4eacCBD\u5546\u5708-\u6d4b\u8bd5\u52ff\u52a8","type":"plaza"},{"id":1001086,"name":"\u5317\u4eac\u5927\u671b\u8def\u5546\u5708","type":"plaza"},{"id":1001089,"name":"\u5317\u4eac\u671d\u9633\u4e07\u8fbe\u5e7f\u573a","type":"plaza"},{"id":1001093,"name":"\u5317\u4eac\u7231\u7434\u6d77123","type":"plaza"},{"id":1001120,"name":"\u5317\u4eac\u5546\u5708\u4e1a\u52a1\u573a\u666f\u6d4b\u8bd5","type":"plaza"},{"id":1001122,"name":"\u5317\u4eac\u5546\u5708\u5316\u4e1a\u52a1\u573a\u666f\u6d4b\u8bd5","type":"plaza"},{"id":16,"name":"(\u4f5c\u5e9f)\u96c5\u5ea7\u5317\u4eac\u533a","type":"merchant"},{"id":2026826,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7279\u5916\u65af\u65f6\u5c1a\u8d38\u6613\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2026944,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u4e1c\u65b9\u6c49\u62ff\u5c71\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2026965,"name":"(\u4f5c\u5e9f)\u6ce2\u4e1d\u53ef\u5546\u4e1a\uff08\u5317\u4eac\uff09\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2026966,"name":"(\u4f5c\u5e9f)\u666e\u5b89\u500d\u5c14\u5546\u4e1a\uff08\u5317\u4eac\uff09\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2026997,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5927\u6b4c\u661f\u6295\u8d44\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2026999,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u4e50\u7545\u4e50\u4eab\u6587\u5316\u53d1\u5c55\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027031,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u65af\u660e\u5fb7\u5546\u8d38\u6709\u9650\u516c\u53f8\u4e0a\u6d77\u4e94\u89d2\u573a\u5e97","type":"merchant"},{"id":2027056,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u8863\u604b\u9633\u5149\u5546\u8d38\u6709\u9650\u516c\u53f8\u4e0a\u6d77\u4e00\u5206\u516c\u53f8","type":"merchant"},{"id":2027059,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u8863\u604b\u9633\u5149\u5546\u8d38\u6709\u9650\u516c\u53f8\u4e0a\u6d77\u4e8c\u5206\u516c\u53f8","type":"merchant"},{"id":2027061,"name":"(\u4f5c\u5e9f)\u6ce2\u8292\u5f97\uff08\u5317\u4eac\uff09\u670d\u9970\u5546\u8d38\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027062,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u8863\u5ff5\u9633\u5149\u5546\u8d38\u6709\u9650\u516c\u53f8\u4e0a\u6d77\u4e00\u5206\u516c\u53f8","type":"merchant"},{"id":2027067,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u6052\u4fe1\u73ba\u5229\u73e0\u5b9d\u80a1\u4efd\u6709\u9650\u516c\u53f8\u4e0a\u6d77\u6768\u6d66\u5206\u516c\u53f8","type":"merchant"},{"id":2027094,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5947\u8ff9\u5929\u5730\u4f53\u80b2\u53d1\u5c55\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027244,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u6052\u4fe1\u73ba\u5229\u73e0\u5b9d\u80a1\u4efd\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027249,"name":"(\u4f5c\u5e9f)\u662d\u4eea\u65b0\u5929\u5730\uff08\u5317\u4eac\uff09\u73e0\u5b9d\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027252,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u661f\u5df4\u514b\u5496\u5561\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027274,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5bb6\u4e50\u798f\u5546\u4e1a\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027275,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u9ea6\u5f53\u52b3\u98df\u54c1\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027276,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5fc5\u80dc\u5ba2\u6bd4\u8428\u997c\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027279,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u80af\u5fb7\u57fa\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027282,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u94f6\u6cb3\u4e07\u5343\u767e\u8d27\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027286,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u661f\u7269\u8bed\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027289,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5c48\u81e3\u6c0f\u4e2a\u4eba\u7528\u54c1\u8fde\u9501\u5546\u5e97\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027292,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7cbe\u5f69\u70ed\u98ce\u5546\u8d38\u6709\u9650\u8d23\u4efb\u516c\u53f8","type":"merchant"},{"id":2027296,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5409\u91ce\u5bb6\u5feb\u9910\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027302,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5e02\u897f\u5355\u9ebb\u8fa3\u8bf1\u60d1\u9910\u996e\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027304,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u845b\u82cf\u521b\u610f\u5546\u8d38\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027308,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u771f\u529f\u592b\u5feb\u9910\u8fde\u9501\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027316,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u901a\u76ca\u76c8\u5bcc\u58eb\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027319,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5927\u6b4c\u661f\u9910\u996e\u5a31\u4e50\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027330,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7ea2\u9ec4\u84dd\u79d1\u6280\u53d1\u5c55\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027334,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u79be\u7eff\u56de\u8f6c\u5bff\u53f8\u996e\u98df\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027343,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u6c49\u62ff\u5c71\u70e7\u70e4\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027349,"name":"(\u4f5c\u5e9f)\u8d5b\u767e\u5473\u54c1\u724c\u7ba1\u7406\u987e\u95ee\uff08\u5317\u4eac\uff09\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027352,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5927\u6b4c\u661f\u8d85\u5e02\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027367,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u9a6c\u514b\u534e\u83f2\u670d\u9970\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027372,"name":"(\u4f5c\u5e9f)\u4e1d\u8299\u5170\uff08\u5317\u4eac\uff09\u5316\u5986\u54c1\u9500\u552e\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027452,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u4fe1\u6052\u5408\u4e30\u9910\u996e\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027462,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5fc5\u80dc\u5ba2\u62ab\u8428\u997c\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027474,"name":"(\u4f5c\u5e9f)\u666e\u5b89\u500d\u5c14\u5546\u4e1a\uff08\u5317\u4eac\uff09\u6709\u9650\u516c\u53f8\u6cf0\u5dde\u6d4e\u5ddd\u4e1c\u8def\u5206\u516c\u53f8","type":"merchant"},{"id":2027501,"name":"(\u4f5c\u5e9f)\u671b\u6e58\u56ed\uff08\u5317\u4eac\uff09\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027525,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7f8e\u627f\u521b\u5c55\u79d1\u6280\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027535,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u70ed\u98ce\u65f6\u5c1a\u8d38\u6613\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027593,"name":"(\u4f5c\u5e9f)\u6d77\u9e3f\u8fbe(\u5317\u4eac)\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027613,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5e02\u5927\u4e2d\u5bb6\u7528\u7535\u5668\u8fde\u9501\u9500\u552e\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027632,"name":"(\u4f5c\u5e9f)\u98d2\u62c9\u5546\u4e1a\uff08\u5317\u4eac\uff09\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027665,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u4e50\u7545\u4e50\u4eab\u6587\u5316\u53d1\u5c55\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027704,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7389\u5170\u9999\u76f4\u96b6\u4f1a\u9986\u9910\u996e\u6587\u5316\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027721,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u4e07\u8fbe\u56fd\u9645\u7535\u5f71\u57ce\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027751,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5927\u6b4c\u661f\u6295\u8d44\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027775,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u7d2b\u7981\u7ea2\u9152\u4e1a\u8fde\u9501\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027889,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u84dd\u6cf0\u5fb7\u65c5\u6e38\u4f11\u95f2\u7528\u54c1\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027910,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u548c\u5408\u8c37\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027921,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u8863\u5ff5\u9633\u5149\u5546\u8d38\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027922,"name":"(\u4f5c\u5e9f)\u6d3b\u529b\u80e1\u6912\uff08\u5317\u4eac\uff09\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027932,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5e02\u6b63\u4e00\u5473\u5feb\u9910\u7ba1\u7406\u6709\u9650\u516c\u53f8\u5929\u6d25\u5206\u5e97","type":"merchant"},{"id":2027940,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u65b0\u5b9c\u5fb7\u6839\u7f8e\u5bb9\u7f8e\u53d1\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027945,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u8428\u8389\u4e9a\u9910\u996e\u7ba1\u7406\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027948,"name":"(\u4f5c\u5e9f)\u6df1\u5733\u5e02\u8863\u5178\u670d\u9970\u8bbe\u8ba1\u6709\u9650\u516c\u53f8\u5317\u4eac\u5206\u516c\u53f8","type":"merchant"},{"id":2027950,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u58f9\u7f8e\u70ab\u52a8\u8d38\u6613\u6709\u9650\u516c\u53f8","type":"merchant"},{"id":2027955,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u5e7f\u548c\u957f\u8363\u5546\u8d38\u6709\u9650\u516c\u53f8","type":"merchant"},
			{"id":2027957,"name":"(\u4f5c\u5e9f)\u5317\u4eac\u52e4\u9f0e\u6e90\u5546\u8d38\u6709\u9650\u516c\u53f8","type":"merchant"}
		];
		
		return data;
	},
	/**
	 * @method getMenu
	 * @desc 获取菜单数据
	 */
	getMenu() {

	}
}