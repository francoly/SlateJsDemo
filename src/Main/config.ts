export const initialValue: any[] = [
  { type: "heading-one", children: [{ text: "顺丰" }], align: "center" },
  { type: "heading-two", children: [{ text: "简介：" }] },
  {
    type: "paragraph",
    children: [
      { text: "  " },
      { text: "顺丰", bold: true },
      {
        text: "是国内的快递物流综合服务商，总部位于深圳，经过多年发展，已初步建立为客户提供一体化综合物流解决方案的能力。不仅提供配送端的物流服务，还延伸至 ",
      },
      {
        text: "价值链前端的产、供、销、配等环节",
        underline: true,
        italic: true,
        bold: true,
      },
      {
        text: "，从消费者需求出发，以数据为牵引，利用大数据分析和云计算技术，为客户提供仓储管理、销售预测、大数据分析、金融管理等一揽子解决方案。",
      },
    ],
  },
  {
    type: "image",
    alt: "test",
    src: "https://htm.sf-express.com/.gallery/about_us/image_l.jpg",
    width: 792,
    height: 305,
    dataId: "data_1663217343736",
    children: [{ text: " " }],
    align: "center",
  },
  { type: "heading-two", children: [{ text: "业务概括：" }] },
  {
    type: "numbered-list",
    children: [
      {
        type: "list-item",
        children: [
          { text: "快递业务——", bold: true },
          {
            text: "作为国内快递行业中首家拥有自有全货机的公司，截至2018年12月31日，顺丰拥有66架全货机、9个枢纽级中转场，49个航空、铁路站点，143个片区中转场，330个集散点。",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "冷运业务——", bold: true },
          {
            text: "覆盖食品行业生产、电商、经销、零售等多个领域，为客户提供定制化包装，通过高蓄能冷媒温控技术，仓储温度、湿度异常预警监测系统，GROUND陆运资源交易平台衔接车辆GPS全球定位及车载温控实时监测系统，与顺丰冷链网络无缝对接，提供专业、高效的运输服务。",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "医药业务——", bold: true },
          {
            text: "利用航空、陆运、仓储等资源优势，顺丰医药整合顺丰现有网点及末端配送资源，为医药行业提供专业高效、安全可靠的医药供应链解决方案。",
          },
        ],
      },
    ],
  },
  { type: "paragraph", children: [{ text: "" }] },
  { type: "gap-line", children: [{ text: "" }] },
  {
    type: "block-quote",
    children: [{ text: "这是一个尚未完善的表格！！！！！" }],
  },
  {
    type: "table",
    dataId: "data_1663426207377",
    children: [
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
        ],
      },
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
        ],
      },
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
        ],
      },
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
        ],
      },
      {
        type: "table-row",
        children: [
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
          { type: "table-cell", children: [{ text: "SF" }] },
        ],
      },
    ],
  },
  { type: "gap-line", children: [{ text: "" }] },
  { type: "block-quote", children: [{ text: "这个是一个地图插件" }] },
  { type: "map", children: [{ text: " " }] },
  { type: "gap-line", children: [{ text: "" }] },
  {
    type: "heading-two",
    children: [{ text: "MARK DOWN SYNTAX " }],
    align: "center",
  },
  {
    type: "heading-two",
    align: "left",
    children: [{ text: "## This is a title" }],
  },
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "```This is code scope``" }],
  },
  {
    type: "paragraph",
    children: [{ text: "**Right, this is a bold words**" }],
  },
  { type: "paragraph", children: [{ text: "*Oh my gad, i'm tilted*" }] },
  { type: "paragraph", children: [{ text: ">>It's  a quote" }] },
  { type: "paragraph", children: [{ text: "***" }] },
  {
    type: "paragraph",
    children: [{ text: "**Stay tuned for more features**" }],
    align: "center",
  },
];
