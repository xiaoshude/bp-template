import $ from 'jquery';

/**
 * @method getData
 * @desc 获取数据
 * @param url {String} 请求方法
 * @param opts {Object} 请求额外参数,如header
 * @returns {*}
 */
const getData = (url, opts = { method: 'GET' }) => {
	var deferred = $.Deferred(),
		requestData = $.extend({
			success(response) {
				if(response && response.status == 200) {
					deferred.resolve(response.data || {});
				} else {
					deferred.reject(response.message, response);
				}
			},
			cache: false,
			dataType: 'json',
			fail() {
				deferred.reject('请求出错,请稍后重试');
			}
		}, opts);

	url = host + url;

	if(requestData.params){
		let params = requestData.params;
		url += url.indexOf('?')>-1 ? '&' : '?';
		url += tool.formatData(params);
	}

	$.ajax(url, requestData);
	return deferred.promise();
}