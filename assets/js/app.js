/* 
GAME STRUCTURE:
===============
01. The game starts when the player hits the START button.
02. Once the game starts the is a clock countdown.
03. The time given is the total time to finish the whole game.
04. The game ends if the time runs out, Game Over.
05. The player can only guess one answer per question.
06. Include the timer so the player can see it.
07. All the questions are displayed at once.
08. There is a DONE button at the end, if the user is finished before the timer stops.
*/

//IMPORTANT!
$(document).ready(function(){

// GLOBAL VARIABLES
// ================

	//Define all global variables and objects
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;
	var messages = {
		correct: "回答正确"+ "<br>" +'"Now,discover your strengths!"',
		incorrect: "回答错误" + "<br>" + '"Well,Sometimes You Win--Sometimes You Learn"',
		endTime: "时间到" + "<br>" + "持续学习，持续改善。",
		finished: "只是做题是无法达到敏捷的，带着团队训练吧。"
	};

	//All questions inside an array of objects
	var triviaQuestions = [
		{	question: "敏捷负责人参与每日Scrum的主要原因是？",
			answerList: [	
						"A. 确保所有团队成员都回答了“那三个问题”。",
						"B. 收集状态与进度信息以报告管理层。",
						"C. 他/她其实没有必要到场；但他/她需要确保开发团队有进行每日Scrum仪式。",
						"D. 记录下所有冲刺积压表中的所有变更，包括新增的内容，并追踪燃尽图的状态。"
						],
			answer: 2,
			image: "assets/images/q1.jpg",
			answerText: "敏捷负责人所要保障的是—"+ "<br>" + "开发团队成员在24小时内发生至少1次每日Scrum事件。"
		},
		{	question: "当多个团队开发同一款产品时，每个团队应该维护各自独立的产品积压表。",
			answerList: [	
						"A. 正确。",
						"B. 错误。"
						],
			answer: 1,
			image: "assets/images/q2.jpg",
			answerText: "无论有多少个团队，1款产品只使用1个产品积压表。" + "<br>" + "如果存在多个积压表，会导致开发团队无法判断需要优先完成什么内容。"
		},
		{	question: "选择下列对Scrum理解错误的一项：",
			answerList: [	
						"A. Scrum是一种基于经验主义的过程控制理论。",
						"B. Scrum是一种可以只采用其中某些功能到工作环境中的方法。",
						"C. Scrum是一种用来开发和维护复杂产品的框架。",
						"D. Scrum是一种基于整个团队的知识与经验，来优化决策的框架。",
						"E. Scrum并不会降低复杂，复杂会随着产品的成长而增加。"
						],
			answer: 1,
			image: "assets/images/q3.png",
			answerText: "Scrum中的每个事件都服务某个具体目的，有赖于对Scrum各个事件的充分运用，才能提升开发复杂产品的成功率。" + "<br>" + "通过不断明确增量的价值，团队能够快速发现和响应产品反馈，并迅速调整。"
		},
		{	question: "开发团队在冲刺中不应该被打断冲刺目标需要保持完整性这些条件可以促进创造力、质量和生产力（以下哪个答案不对？）",
			answerList: [
						"A. 如果发现增量比预期更多或更少，开发团队可以和产品负责人合作，移除或增加工作内容。",
						"B. 随着产品积压表中的事项被不断拆解，冲刺计划表中的事项会变化，并可能随着工作开展而增长。",
						"C. 冲刺积压表在冲刺计划会中已经明确，冲刺期间禁止更改。",
						"D. 当开发团队询问时，产品负责人可以协助阐明或优化冲刺。"
						],
			answer: 2,
			image: "assets/images/q4.jpg",
			answerText: "冲刺积压表可视化开发团队为满足冲刺目标，而确定的所有工作内容。" + "<br>" + "开发团队在冲刺期间会修改冲刺积压表，所以冲刺积压表会在冲刺期间不断变化。"
		},		
		{	question: "组织决定采用Scrum，但是管理层希望将术语更改为符合已经在使用的术语。如果这样做会发生什么？",
			answerList: [
						"A. 没有新词汇来提醒大家变化正在发生，实际上几乎不会发生变化。",
						"B. 组织可能不理解Scrum带来了什么变化，并且Scrum带来的利益可能会打水漂。",
						"C. 管理层可能会感到不那么焦虑。",
						"D. 以上全是。"
						],
			answer: 3,
			image: "assets/images/q5.jpg",
			answerText: "呵呵"
		},
		{	question: "开发团队需要为单次冲刺，从产品积压表中选择多少工作？",
			answerList: [	
						"A. 所有开发工作和必须要做的测试。",
						"B. 开发团队根据冲刺目标，尽可能选择产品积压表中已完成（DoD）梳理的项，并且告知产品负责人。",
						"C. 尽可能的填满整个冲刺。",
						"D. 分析，设计，开发，测试和文档整理。"
						],
			answer: 1,
			image: "assets/images/q6.jpg",
			answerText: "每个冲刺的目的都是提供潜在发布可能的增量，这些功能要符合Scrum团队当前对“完成”的定义（DoD）。"
		},	
		{	question: "哪项陈述最能说明产品负责人的责任？",
			answerList: [	
						"A. 指导开发团队。",
						"B. 优化开发团队所做工作的价值。",
						"C. 管理项目并确保工作符合对利益相关者的承诺。",
						"D. 防止利益相关者分散开发团队的注意力。"
						],
			answer: 1,
			image: "assets/images/q7.jpg",
			answerText: "产品负责人负责最大程度地提高产品和开发团队工作结果的价值。"
		},
		{	question: "冲刺的目的是为可工作的产品提供“完成”的增量。",
			answerList: [	
						"A. 正确。",
						"B. 错误。"
						],
			answer: 0,
			image: "assets/images/q8.png",
			answerText: "Scrum的核心是冲刺，即1个月或更短的时间盒，在此期间创建满足“DoD”、可用的，且可用于发布的产品增量。"
		},
		{	question: "CEO要求开发团队在正在进行的冲刺中添加“非常重要”的项目，开发团队应该做什么？",
			answerList: [	
						"A. 无需任何调整即可将项目添加到当前的冲刺中。",
						"B. 通知产品负责人，以便他/她可以与CEO沟通需求。",
						"C. 将该项目添加到当前的冲刺中，并移除1个大小相等的项目。",
						"D. 将项目添加到下一个冲刺中。"
						],
			answer: 1,
			image: "assets/images/q9.jpg",
			answerText: "冲刺积压表中有开发团队与产品负责人一起选出的符合冲刺目标的最有价值项。请勿进行任何危及冲刺目标的更改。" + "<br>" + "Scrum团队外的任何人都不能对开发团队（冲刺积压表）和产品所有者（产品积压表）进行更改。"
		},		
		{	question: "下面哪个角色不属于一个Scrum团队？",
			answerList: [	
						"A. Scrum负责人。",
						"B. 产品负责人。",
						"C. 开发团队。",
						"D. 项目经理。"
						],
			answer: 3,
			image: "assets/images/q10.png",
			answerText: "Scrum团队由Scrum负责人（管理过程），产品负责人（决定要做什么）和开发团队（负责工作）组成。"
},
		{	question: "冲刺的长度应为：",
			answerList: [	
						"A. 足够短，以使产品负责人可接受业务风险。",
						"B. 足够短，以将开发工作与其他业务事件同步。",
						"C. 不超过1个月。",
						"D. 上述都对。"
						],
			answer: 3,
			image: "assets/images/q11.png",
			answerText: "所有这些选项都是确定冲刺长度时的合理考虑因素。"
},
		{	question: "对于开发团队（Scrum团队内），建议的规模是多少？",
			answerList: [	
						"A. 9 人。",
						"B. 最少 7 人。",
						"C. 7 ± 2 人。",
						"D. 3 到 9 人。"
						],
			answer: 3,
			image: "assets/images/q12.jpg",
			answerText: "最佳开发团队规模应该大小适中。" + "<br>" + "少于3个人的开发团队会减少互动，并导致生产力低下；" + "<br>" + "9个以上成员的团队会需要太多的协调。"
},
		{	question: "以下哪种服务最适合敏捷负责人实现每日Scrum？",
			answerList: [	
						"A. 以确保每个团队成员都有发言权的方式进行协助。",
						"B. 领导开发团队的讨论。",
						"C. 辅导开发团队将每日Scrum保持在15分钟内。",
						"D. 确保“那三个问题”都得到回答。"
						],
			answer: 2,
			image: "assets/images/q13.png",
			answerText: "敏捷负责人要确保开发团队有举办会议，开发团队对自己的每日Scrum负责。" + "<br>" + "敏捷负责人辅导开发团队将每日Scrum保持在15分钟内。" + "<br>" + "敏捷负责人强制执行规则：只有开发团队成员才能参与每日Scrum。"
},
		{	question: "管理在Scrum中的作用是什么？",
			answerList: [	
						"A. 通过对高价值产品和系统功能的见识和信息，为PO提供支持。",
						"B. 确定并遣散工作不够努力的人。",
						"C. 持续监控开发团队的人员配备水平。",
						"D. 监视开发团队的生产力。"
						],
			answer: 0,
			image: "assets/images/q14.jfif",
			answerText: "管理人员在Scrum开发实际产品中没有积极作用。" + "<br>" + "但是，Scrum团队外部管理者对于设定愿景和策略，以指导组织的总体方向至关重要。"
},
		{	question: "冲刺评审会的最大时间长度（时间盒）为：（选最佳答案）",
			answerList: [	
						"A. 想多长就多长。",
						"B. 2小时。",
						"C. 为期1月的冲刺需4小时评审为期更短的冲刺，评审会一般也会更短。",
						"D. 1整天。"
						],
			answer: 2,
			image: "assets/images/q15.jfif",
			answerText: "冲刺评审会是个时间盒，1个月长度的冲刺，会议时长为4小时。" + "<br>" + "对于较短的冲刺，时间通常也较短。"
},
		{	question: "每日Scrum的时间盒是多少？",
			answerList: [	
						"A. 每个人2分钟。",
						"B. 固定时间，日复一日，不做改变。",
						"C. 4小时。",
						"D. 15分钟。"
						],
			answer: 3,
			image: "assets/images/q16.jfif",
			answerText: "每日Scrum的时长为15分钟，但不会因冲刺长度变化而变化。"
},
		{	question: "谁创建“完成”的定义？",
			answerList: [	
						"A. Scrum Master，因为他/她负责开发团队的工作效率。",
						"B. Scrum团队，在共同努力下，其结果是所有成员定义的共识结果。",
						"C. 产品负责人，他/她对产品的成功负责。",
						"D. 开发组织（如果没有开发组织，则为开发团队）。"
						],
			answer: 3,
			image: "assets/images/q17.jfif",
			answerText: "“完成”的定义由开发组织约定，作为标准或准则的一部分，所有Scrum团队都必须遵循。" + "<br>" + "Scrum团队的开发团队可通过针对产品或上下文特定元素对其进行补充。" + "<br>" + "如果“完成”不由开发组织规定，则Scrum团队的开发团队必须定义适合该产品的“完成”定义。"
},
		{	question: "谁应该最了解实现业务目标或发布的进度，并且能够最清楚地解释替代方案？",
			answerList: [	
						"A. 产品负责人。",
						"B. 项目经理。",
						"C. 开发团队。",
						"D. 敏捷负责人。"
						],
			answer: 0,
			image: "assets/images/q18.jpg",
			answerText: "产品负责人是负责管理产品积压表的唯一人员，" + "<br>" + "负责保障产品积压表对所有人都可见、透明和清晰，" + "<br>" + "并说明Scrum团队下一步将要做什么。"
},
		{	question: "开发团队成员的变动：",
			answerList: [	
						"A. 绝不该发生，因为这将导致产能降低。",
						"B. 根据需要，无需特别考虑产能的变化。",
						"C. 根据需要，同时把产能的短期下降纳入考量。",
						"D. 每个冲刺都应该变动，以促进共享学习。"
						],
			answer: 2,
			image: "assets/images/q19.png",
			answerText: "团队通常需要磨合才能达到良好的表现状态。" + "<br>" + "成员变动通常会降低凝聚力，导致短期内影响表现和产能下降。"
},
		{	question: "冲刺规划会的时间盒是？",
			answerList: [	
						"A. 4小时。",
						"B. 1个月。",
						"C. 1个月时长的冲刺，会议时间盒为8小时。更短周期的冲刺，计划会通常耗时也更短。",
						"D. 不限制，直到问题解决为止。"
						],
			answer: 2,
			image: "assets/images/q20.png",
			answerText: "冲刺计划会的时间盒，以1个月时长冲刺为例，会议时长上限8小时。" + "<br>" + "对于较短周期冲刺，计划会时间通常更短。"
},
		{	question: "经验过程控制的三支柱是：",
			answerList: [	
						"A. 规划，检查，调整。",
						"B. 尊重人，改善，消除浪费。",
						"C. 检查，透明，调整。",
						"D. 透明，消除浪费，改善。",
						"E. 计划，演示，回顾。"
						],
			answer: 2,
			image: "assets/images/q21.jfif",
			answerText: "Scrum是建立在经验主义基础上的过程控制理论，" + "<br>" + "知识来自经验，并根据已有知识做决策支撑。" + "<br>" + "经验过程控制实施的三支柱：透明、检查和调整。"
},
		{	question: "冲刺何时结束（选择最佳答案）",
			answerList: [	
						"A. 所有任务都完成时。",
						"B. 所有产品积压表项目都满足它们的DoD时。",
						"C. 冲刺时间盒耗尽时。",
						"D. 产品负责人说完成时。"						
						],
			answer: 2,
			image: "assets/images/q22.jpg",
			answerText: "冲刺时间盒是固定的，不可缩短也不可延长。"
},
		{	question: "谁对产品积压表拥有最终决定权？ （选择最佳答案）",
			answerList: [	
						"A. 产品负责人。",
						"B. CEO。",
						"C. 敏捷负责人。",
						"D. 开发团队。",
						"E. 利益相干者。"
						],
			answer: 0,
			image: "assets/images/q23.jpg",
			answerText: "产品负责人是负责管理产品积压表的唯一人员。"
},
{	question: "为什么每日Scrum会在同一时间和同一地点举行？（选择最佳答案）",
			answerList: [	
						"A. 产品负责人要求的。",
						"B. 会议室很难预订，因此要提前预订。",
						"C. 这样就可以给空间命名。",
						"D. 一致性能降低复杂性。"						
						],
			answer: 3,
			image: "assets/images/q24.jfif",
			answerText: "每日Scrum在同一时间和地点举行，以减少复杂性。"
},
{	question: "下列哪条陈述最能描述冲刺评审？（选择最佳答案）",
			answerList: [	
						"A. 冲刺末尾时要展示产品，供组织中的每个人检查完成的工作。",
						"B. 这是控制冲刺期间开发团队活动的一种机制。",
						"C. 这是Scrum团队和利益相关者检查冲刺结果并弄清下一步该怎么做的时机。"
						],
			answer: 2,
			image: "assets/images/q25.jfif",
			answerText: "冲刺作为其他事件的容器，" + "<br>" + "Scrum所包含的每个事件，都是检查与调整的时机。"
},
{	question: "每个事件都对应一个时间盒，该怎么理解？（选择最佳答案）",
			answerList: [	
						"A. 事件必须在给定的时间发起。",
						"B. 事件必须在固定的事件发起。",
						"C. 事件需要设定时长下限。",
						"D. 事件需要设定时长上限。"						
						],
			answer: 3,
			image: "assets/images/q26.jpg",
			answerText: "时间盒是举办事件的最大持续时长。"
},
{	question: "产品积压表要如何排序？（选择最佳答案）",
			answerList: [	
						"A. 待办项随机排序即可。",
						"B. 产品负责人负责给出最合适的排序。",
						"C. 基于风险控制，越安全的项目放顶部，越危险的项目放底部。",
						"D. 基于规模，小项目放顶部，大项目放底部。",
						"E. 价值最少的项目放顶部，价值最大的项目放底部。"						
						],
			answer: 1,
			image: "assets/images/q27.jpg",
			answerText: "产品负责人将决定最有意义的事情，以最优化开发团队所完成工作的价值。"
},
{	question: "谁负责在冲刺期间管理工作进度？（选择最佳答案）",
			answerList: [	
						"A. 开发团队。",
						"B. 团队中最初级的成员。",
						"C. 敏捷负责人。",
						"D. 产品负责人。"
						],
			answer: 0,
			image: "assets/images/q28.jfif",
			answerText: "开发团队使用每日Scrum来检查实现冲刺目标的进度，" + "<br>" + "也检查为了达成冲刺目标的相关工作项的进度。"
},
{	question: "根据《Scrum指南》，下列哪个事件设置了时间盒限制？",
			answerList: [	
						"A. 发布测试会。",
						"B. 每日Scrum会。",
						"C. 策划冲刺会。",
						"D. 代码评审会。"
						],
			answer: 1,
			image: "assets/images/q29.jfif",
			answerText: "《Scrum指南》指出，所有“Scrum事件”都有时间限制。" + "<br>" + "时长1个月或少于1个月的冲刺，冲刺计划会最多8个小时，" + "<br>" + "每日Scrum限制在15分钟，Sprint评审会最多4个小时，冲刺回顾会最多3个小时。"
},
// 第30题
{	question: "Scrum基于哪种类型的过程控制？（选择最佳答案）",
			answerList: [	
						"A. 经验。",
						"B. 复杂。",
						"C. 混合。",
						"D. 定义。"
						],
			answer: 0,
			image: "assets/images/q30.svg",
			answerText: "Scrum建立在经验主义过程控制理论或经验主义的基础上。" + "<br>" + "经验主义断言，知识来自经验，并根据已知的知识做出决策。"
},

// 31题

{	question: "是非题：必须在每次冲刺结束时将产品增量发布到生产环境中。",
			answerList: [	
						"A. 对。",
						"B. 错。"
						],
			answer: 1,
			image: "assets/images/q31.jpg",
			answerText: "在每个冲刺结束时,产品增量应该是可用并可发布的，但不强制发布线上。"
},

// 32 题

{	question: "当许多开发团队一起开发单个产品时，什么最能描述“完成”的定义？ （选择最佳答案）",
			answerList: [	
						"A. 所有开发团队都必须对“完成”进行定义，以使合并后的工作结果有可能发布。",
						"B. 这取决于..天意",
						"C. 每个开发团队都定义并使用自己的“完成”。 通过强化冲刺期间的讨论来解决理解差异。",
						"D. 每个开发团队都使用自己的定义，但必须向其他所有团队明确其定义，以便知悉差异。"
						],
			answer: 0,
			image: "assets/images/q32.jfif",
			answerText: "Scrum要求有增量才能发布。这指的是产品的增量。 " + "<br>" + "理想预期是多个团队开发单个产品，并持续提供这样的增量。"
},

// 33题

{	question: "下面哪一个选项符合基于Scrum手册的自组织团队描述？",
			answerList: [	
						"A. 开发团队成员正在其职责描述的范围内工作，并很好地将结果从策划转移到开发，再到测试，再进行集成。",
						"B. 老板参加“每日Scrum会”以检查进度，并与Scrum负责人合作以优化冲刺的功能范围。",
						"C. 开发团队拥有创建可发布增量所需的所有技能。",
						"D. 开发团队邀请外部人员参加冲刺计划会，询问他们如何通过完整且详细的待办清单，将产品积压表的内容转换为产品增量。"
						],
			answer: 2,
			image: "assets/images/q33.jfif",
			answerText: "1. 每日Scrum属于开发团队，只有开发团队能参与。外部利益相关者不应使用它来检查进度。" + "<br>" + "2. 在冲刺计划会期间，Scrum团队应根据冲刺的目标，从产品积压表中挑选需要完成的待办项。开发团队负责确定实现冲刺目标所需的工作。" + "<br>" + "3. Scrum开发团队成员没有头衔，也没有子团队；例如测试，架构或运维小组。无论团队成员是否具有专业技能，整个开发团队共同承担责任。"
},

	];


// FUNCTIONS
// =========

	//This hides the game area on page load
	$("#gameCol").hide();
	
	//This captures user click on start button to create a new game
	$("#startBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This captures the user's click on the reset button to create a new game
	$("#startOverBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This function sets up the page for a new game emptying all areas and showing game area
	function newGame(){
		$("#gameCol").show();
		$("#finalMessage").empty();
		$("#correctAnswers").empty();
		$("#incorrectAnswers").empty();
		$("#unanswered").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		currentQuestion = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		newQuestion();
	}

	//This function displays the next question
	function newQuestion(){
		$("#message").empty();
		$("#correctedAnswer").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		answered = true;
		
		//This function displays the new question
		$("#currentQuestion").html("答题进度 " + (currentQuestion+1) + " of " + triviaQuestions.length);
		$(".question").html(triviaQuestions[currentQuestion].question);

		//This function displays the new questions's answer options in multiple choice type
		for(var i = 0; i <= 6; i++){

			var choices = $("<div>");
			choices.text(triviaQuestions[currentQuestion].answerList[i]);
			choices.attr({"data-index": i });
			choices.addClass("thisChoice");
			$(".answerList").append(choices);
		}

		//This sets the timer
		countdown();

		//When user clicks on n answer this will pause the time and display the correct answer to the question 
		$(".thisChoice").on("click",function(){
				userSelect = $(this).data("index");
				clearInterval(time);
				answerPage();
			});
		}

	//This function is for the timer countdown
	function countdown(){
		seconds = 30;
		$("#timeLeft").html("00:" + seconds);
		answered = true;
		//Sets a delay of one second before the timer starts
		time = setInterval(showCountdown, 1000);
	}

	//This function displays the countdown
	function showCountdown(){
		seconds--;

		if(seconds < 10) {
			$("#timeLeft").html("00:0" + seconds);	
		} else {
			$("#timeLeft").html("00:" + seconds);	
		}
		
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//This function takes the user to the answer page after the user selects an answer or timer runs out
	function answerPage(){
		$("#currentQuestion").empty();
		$(".thisChoice").empty(); //Clears question page
		$(".question").empty();
		$("#gif").show();
		$("#gifCaption").show();

		var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
		var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

		//This adds the gif that corresponds to this quesiton
		var gifImageLink = triviaQuestions[currentQuestion].image;
		var newGif = $("<img>");
		newGif.attr("src", gifImageLink);
		newGif.addClass("gifImg");
		$("#gif").html(newGif);

		//STILL TO DO
		//This adds a line of text below the gif that talks about why the answer is correct.
		var gifCaption = triviaQuestions[currentQuestion].answerText;
			newCaption = $("<div>");
			newCaption.html(gifCaption);
			newCaption.addClass("gifCaption");
			$("#gifCaption").html(newCaption);
		
		//This checks to see if user choice is correct, incorrect, or unanswered
		if((userSelect == rightAnswerIndex) && (answered === true)){
			correctAnswer++;
			$('#message').html(messages.correct);
		} else if((userSelect != rightAnswerIndex) && (answered === true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('正确答案： ' + rightAnswerText);
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('正确答案：' + rightAnswerText);
			answered = true;
		}
		
		if(currentQuestion == (triviaQuestions.length-1)){
			setTimeout(scoreboard, 6000);
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 6000);
		}	
	}

	//This fucntion displays all the game stats
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();
		$('#gif').hide();
		$("#gifCaption").hide();

		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("回答正确: " + correctAnswer);
		$('#incorrectAnswers').html("回答错误: " + incorrectAnswer);
		$('#unanswered').html("没有回答: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html("再次挑战");
	}

// MAIN PROCESS
//=============

}); //IMPORTANT!