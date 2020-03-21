// module : 针对图片分页页面，注入js智能拼页

(function(){
	
	var ParsePaginaBarResult = function(barNode,nextUrls){
		this.barNode = barNode;
		this.nextUrls = nextUrls ;
	}
	var parsePaginaBar = function(){
		// 第一步：找分页按钮,实例：共x页：1 2 3 4 下一页
		// 通常“下一页”是固定的,开始为“共x页”或“上一页”
		// 也有少数网站可能用 “<<” 和">>"形式表示上一页、下一页，这种情况暂不实现
		
		var listOfArch = document.querySelectorAll('a');
		var nextPageButtonIndex = (function(){
			for ( var i=1;i<listOfArch.length;i++){
				var a = listOfArch[i]
				if(a.innerText == '下一页'){
					// 上一个按钮应是数字页码（即使上一个不是，上上个也是）
					if( !!listOfArch[i-1].innerText.match(/^\d+$/) || ( i > 2 && !!listOfArch[i-2].innerText.match(/^\d+$/))){
						return i ;
					}
				}
			}
		})()
		if( nextPageButtonIndex == null || nextPageButtonIndex == undefined) {
			console.error('找不到分页列表按钮')
			return 
		}
		var nextPageButton = listOfArch[nextPageButtonIndex]
		// 获取页码大于1的所有分页按钮
		return (function(){
			var idx = nextPageButtonIndex - 1
			var pageNos = [] // 存放页码列表： [2,3],第一页为当前页不用存
			var pageBtnIndices = [] // 与pageNos对应，存放listOfArch数组中<A>元素下标
			var noHrefMap = {}
			if ( !listOfArch[idx].innerText.match(/^\d+$/) && listOfArch[idx-1].innerText.match(/^\d+$/)){
				// 如果上上个按钮是数字，则该按钮为最大页码
				idx --
			}
			// 检查页数是否大于1
			if(Number.parseInt(listOfArch[idx]) == 1 ){
				console.error('分页列表仅有一页')
				return []
			}
			// 沿页码按钮向前遍历，直到第2页
			while(idx>0){
				var buttonText = listOfArch[idx].innerText
				if( buttonText >= 2) {
					pageNos.unshift(Number.parseInt(buttonText))
					pageBtnIndices.unshift(idx)
					noHrefMap[Number.parseInt(buttonText)] = listOfArch[idx].href
				}else{
					break;
				}
				idx --
			}
			
			var rstUrls = []
			// 检查是否有页码省略，如 1 2 3 ... 10 
			if(pageNos[pageNos.length-1] - pageNos.length){
				// 有页码省略，补全省略页的url
				
				// 找到最后一个按钮，解析url与页码规律
				var lastBtn = listOfArch[pageBtnIndices[pageBtnIndices.length-1]]
				var lastBtnUrl = lastBtn.href
				var lastBtnUrlBase = lastBtnUrl.substring(0,lastBtnUrl.lastIndexOf('/')+1)
				var lastBtnUrlRelativePart = lastBtnUrl.substring(1+lastBtnUrl.lastIndexOf('/'))
				// match结果是一个包含数字元素的数字，最后一个元素通常是页码
				var match = lastBtnUrlRelativePart.match(/\d+/g)
				if(!match ){
					throw '页码链接的URL'+lastBtnUrlRelativePart+'中不包含数字'
				}
				// 假如lastBtnUrlRelativePart为 12331_3.html,则prefix为“12331_”，suffix为“.html”
				var _no = match[match.length-1]
				var _idx = lastBtnUrlRelativePart.lastIndexOf(_no)
				var prefix = lastBtnUrlRelativePart.substring(0,_idx)
				var suffix = lastBtnUrlRelativePart.substring(_idx +_no.length)
				var diff = _no - lastBtn.innerText
				var makeUrl = function(no){
					return lastBtnUrlBase + prefix + (no + diff) + suffix
				}
				
				for(var i=pageNos[0];i<=pageNos[pageNos.length-1];i++){
					rstUrls.push(noHrefMap[i] || makeUrl(i))
				}
			}else{
				for(var i of pageNos){
					rstUrls.push(noHrefMap[i])
				}
			}
			
			// 寻找两个DOM元素的最近共同父类
			var findCommonParent = function(n1,n2){
				if(n1.parentNode == n2.parentNode){
					return n1.parentNode
				}
				var getParents = function(n){
					var parents = []
					while((n=n.parentNode)){
						if(n.tagName == 'BODY') break
						parents.push(n)
					}
					return parents
				}
				var parentsOfN1 = getParents(n1)
				var parentsOfN2 = getParents(n2)
				for(var x of parentsOfN1){
					for(var y of parentsOfN1){
						if( x == y){
							return x 
						}
					}
				}
			}
			var barNode = findCommonParent(listOfArch[pageBtnIndices[0]],listOfArch[pageBtnIndices[pageBtnIndices.length-1]]);
			return new ParsePaginaBarResult(barNode,rstUrls);
			
		})()
		
	}
	// 解析正文部分dom选择器
	var paserContentSelector (){
		return ""
	}
	
	// 第一步：找分页按钮
	var barRst = parsePaginaBar();
	


})()