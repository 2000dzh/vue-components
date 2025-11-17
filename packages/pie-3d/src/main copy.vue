<template>
	<div style="width: 100%; height: 100%" ref="TxPie3d"></div>
</template>

<script>
import highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(highcharts);

export default {
	name: 'txPie3d',
	props: {
		optionsData: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			colors: ['#63cd35', '#2449f3', '#6541f3', '#c141f0'],
		};
	},
	watch: {
		optionsData(val) {
			if (val) {
				this.$nextTick(() => {
					this.getEcharts();
				});
			}
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.getEcharts();
		});
	},
	// beforeDestroy() {
	// 	if (highcharts.chart) {
	// 		highcharts.chart.destroy();
	// 		highcharts.chart = null;
	// 	}
	// },
	methods: {
		getEcharts() {
			const TxPie3d = this.$refs.TxPie3d;
			if (!TxPie3d) {
				return;
			}

			this.setOptonHeight();

			const result = this.optionsData.map((item, index) => ({
				...item,
				y: item.value,
				// 是否允许选中后其他项不透明
				selected: false,
				// 设置 true 数据之间会有间隙
				sliced: false,
				
			}));

			highcharts.setOptions({
				colors: this.colors,
			});

			highcharts.chart(
				TxPie3d,
				{
					chart: {
						type: 'pie', //饼图
						options3d: {
							enabled: true, //使用3d功能
							alpha: 60, //延y轴向内的倾斜角度
							beta: 0,
							// distance: 280
						},
						backgroundColor: 'rgba(0, 0, 0, 0)', // 不显示背景色
					},
					legend: {
						align: 'right', // 图例对齐方式
						verticalAlign: 'middle', // 图例垂直对齐方式
						layout: 'vertical', // 图例布局方式
						itemMarginBottom: 10, // 图例项之间的间距
						padding: 2,
						itemStyle: {
							cursor: 'pointer',
							color: '#fff',
						},
						itemHoverStyle: {
							color: '#fff',
						},
						labelFormatter() {
							return `<div>${this.name}(%) ${this.num3}</div>`;
						},
					},
					title: {
						text: '', //图表的标题文字
					},

					tooltip: {
						useHTML: true,
						formatter() {
							return `<div style="color: #ccc">${this.point.name} ${this.point.y}</div>`;
						},
						backgroundColor: 'rgba(5,19,62,0.8)',
						borderWidth: 0,
						padding: 10,
						shadow: '0 6px 10px rgba(67,74,125,0.5)',
					},
					plotOptions: {
						pie: {
							allowPointSelect: true, //每个扇块能否选中
							cursor: 'pointer', //鼠标指针
							depth: 30, //饼图的厚度
							// 环形饼图
							// innerSize: '50%',
							dataLabels: {
								enabled: true, //是否显示饼图的线形tip
								distance: 5, //设置引导线的长度 饼图的大小
								color: '#fff', //全局设置字体颜色
								useHTML: true,
								formatter() {
									return `<div>
                            <span style="color: #358df8" >总数${this.point.y}</span>
                            <span style="color: #f3b631" >未完成${this.point.num4}</span>
                            <br/>
                            <span style="color: #fff" >整改率${this.point.num3}%</span>
                          </div>`;
								},
							},
							// 是否显示图例
							showInLegend: true,
						},
					},
					credits: {
						enabled: false, //禁用版权url    此处不设置
					},
					series: [
						{
							type: 'pie',
							name: '3d饼图',
							data: result,
						},
					],
				},
				function (c) {
					// 图表初始化完毕后的回调函数
					// 环形图圆心
					// var centerY = c.series[0].center[1],
					// 	titleHeight = parseInt(c.title.styles.fontSize);
					// // 动态设置标题位置
					// c.setTitle({
					// 	y: centerY + titleHeight / 2,
					// });
				}
			);
		},
		setOptonHeight() {
			// var each = highcharts.each,
			// 	round = Math.round,
			// 	cos = Math.cos,
			// 	sin = Math.sin,
			// 	deg2rad = Math.deg2rad;
			// highcharts.wrap(
			// 	highcharts.seriesTypes.pie.prototype,
			// 	'translate',
			// 	function (proceed) {
			// 		proceed.apply(this, [].slice.call(arguments, 1));
			// 		// Do not do this if the chart is not 3D
			// 		if (!this.chart.is3d()) {
			// 			return;
			// 		}
			// 		var series = this,
			// 			chart = series.chart,
			// 			options = chart.options,
			// 			seriesOptions = series.options,
			// 			depth = seriesOptions.depth || 0,
			// 			options3d = options.chart.options3d,
			// 			alpha = options3d.alpha,
			// 			beta = options3d.beta,
			// 			z = seriesOptions.stacking
			// 				? (seriesOptions.stack || 0) * depth
			// 				: series._i * depth;
			// 		z += depth / 2;
			// 		if (seriesOptions.grouping !== false) {
			// 			z = 0;
			// 		}
			// 		each(series.data, function (point) {
			// 			var shapeArgs = point.shapeArgs,
			// 				angle;
			// 			point.shapeType = 'arc3d';
			// 			var ran = point.options.h;
			// 			shapeArgs.z = z;
			// 			shapeArgs.depth = depth * 0.75 + ran;
			// 			shapeArgs.alpha = alpha;
			// 			shapeArgs.beta = beta;
			// 			shapeArgs.center = series.center;
			// 			shapeArgs.ran = ran;
			// 			angle = (shapeArgs.end + shapeArgs.start) / 2;
			// 			point.slicedTranslation = {
			// 				translateX: round(
			// 					cos(angle) *
			// 						seriesOptions.slicedOffset *
			// 						cos(alpha * deg2rad)
			// 				),
			// 				translateY: round(
			// 					sin(angle) *
			// 						seriesOptions.slicedOffset *
			// 						cos(alpha * deg2rad)
			// 				),
			// 			};
			// 		});
			// 	}
			// );
			// (function (H) {
			// 	H.wrap(
			// 		highcharts.SVGRenderer.prototype,
			// 		'arc3dPath',
			// 		function (proceed) {
			// 			// Run original proceed method
			// 			var ret = proceed.apply(
			// 				this,
			// 				[].slice.call(arguments, 1)
			// 			);
			// 			ret.zTop = (ret.zOut + 0.5) / 100;
			// 			return ret;
			// 		}
			// 	);
			// })(highcharts);

			var each = highcharts.each,
				round = Math.round,
				cos = Math.cos,
				sin = Math.sin,
				deg2rad = Math.deg2rad;
			highcharts.wrap(
				highcharts.seriesTypes.pie.prototype,
				'translate',
				function (proceed) {
					proceed.apply(this, [].slice.call(arguments, 1));
					// Do not do this if the chart is not 3D
					if (!this.chart.is3d()) {
						return;
					}
					var series = this,
						chart = series.chart,
						options = chart.options,
						seriesOptions = series.options,
						depth = seriesOptions.depth || 0,
						options3d = options.chart.options3d,
						alpha = options3d.alpha,
						beta = options3d.beta,
						z = seriesOptions.stacking
							? (seriesOptions.stack || 0) * depth
							: series._i * depth;
					z += depth / 2;
					if (seriesOptions.grouping !== false) {
						z = 0;
					}
					each(series.data, function (point) {
						var shapeArgs = point.shapeArgs,
							angle;
						point.shapeType = 'arc3d';
						var ran = point.options.h;
						shapeArgs.z = z;
						shapeArgs.depth = depth * 0.75 + ran;
						shapeArgs.alpha = alpha;
						shapeArgs.beta = beta;
						shapeArgs.center = series.center;
						shapeArgs.ran = ran;
						angle = (shapeArgs.end + shapeArgs.start) / 2;
						point.slicedTranslation = {
							translateX: round(
								cos(angle) *
									seriesOptions.slicedOffset *
									cos(alpha * deg2rad)
							),
							translateY: round(
								sin(angle) *
									seriesOptions.slicedOffset *
									cos(alpha * deg2rad)
							),
						};
					});
				}
			);
			(function (H) {
				H.wrap(
					highcharts.SVGRenderer.prototype,
					'arc3dPath',
					function (proceed) {
						// Run original proceed method
						var ret = proceed.apply(
							this,
							[].slice.call(arguments, 1)
						);
						ret.zTop = (ret.zOut + 0.5) / 100;
						return ret;
					}
				);
			})(highcharts);
		},
	},
};
</script>
