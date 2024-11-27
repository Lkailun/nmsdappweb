正式环境的时候，登录和任何操作都要签名，签名内容结尾加个时间戳，signmessage-signature，这个格式放在 authorization

强制绑定邀请人才能进入

团队页面，下面的团队详情就是 userdata 里的 allvalidteam，直接展示，但是直推详情要有些筛选，满足既在 allvalidteam，又在 teamlist 里的才显示，格式和团队详情一致

直推 要满足同时在 allvalidteam 和 teamlist 才展示

邀请链接这里，需要算力>=100 才显示邀请链接，不然就是一串文字

我的页面，银行余额的 转入转出，有个 amount 参数，传正数就是转入，负数就是转出

config
announcement [0]公告 [1] 公告是否强制打开 [2] 公告是否可以关闭

config 和 userinfo 都要判断
canbankout: true
canclaim: true
cansellpower: true

bankfeerate 转入转出手续费

首页 预计产出 USDT 数量/单价

allvalidteam 有效团队

直推 满足既在 allvalidteam，又在 teamlist 里的才显示

allvalidteam
[0] 等级
[1] 团队人数
[2] 团队业绩

<!-- 我的 -->

资产 bankbalance + flokibalance
昨日产出 账单除了提币其他的累加

账单：
默认值产出 staticreward 时间 金额
推荐(搜索对应的是驱动值) dynamiclogs 时间 金额 来源 代数
算力 powerlogs
团队 teamlogs
银行 banklogs bankreward/bankin/bankout 银行产出/银行转入/银行转出

提币 claimlogs
