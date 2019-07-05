"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _cell = _interopRequireDefault(require("../../cell"));

var _vXETable = require("../../v-x-e-table");

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rowUniqueId = 0;
var browse = _tools.DomTools.browse;
var isWebkit = browse['-webkit'] && !browse['-ms'];
var debounceScrollYDuration = browse.msie ? 40 : 20;
/**
 * 渲染浮固定列
 */

function renderFixed(h, $table, fixedType) {
  var tableData = $table.tableData,
      tableColumn = $table.tableColumn,
      visibleColumn = $table.visibleColumn,
      collectColumn = $table.collectColumn,
      isGroup = $table.isGroup,
      height = $table.height,
      parentHeight = $table.parentHeight,
      vSize = $table.vSize,
      headerHeight = $table.headerHeight,
      footerHeight = $table.footerHeight,
      showHeader = $table.showHeader,
      showFooter = $table.showFooter,
      tableHeight = $table.tableHeight,
      columnStore = $table.columnStore,
      footerData = $table.footerData;
  var customHeight = height === 'auto' ? parentHeight : _xeUtils.default.toNumber(height);
  var fixedColumn = columnStore["".concat(fixedType, "List")];
  return h('div', {
    class: "vxe-table--fixed-".concat(fixedType, "-wrapper"),
    ref: "".concat(fixedType, "Container")
  }, [showHeader ? h('vxe-table-header', {
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      size: vSize,
      fixedColumn: fixedColumn,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Header")
  }) : null, h('vxe-table-body', {
    style: {
      top: "".concat(headerHeight, "px")
    },
    props: {
      fixedType: fixedType,
      tableData: tableData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      collectColumn: collectColumn,
      fixedColumn: fixedColumn,
      size: vSize,
      isGroup: isGroup
    },
    ref: "".concat(fixedType, "Body")
  }), showFooter ? h('vxe-table-footer', {
    style: {
      top: "".concat(customHeight ? customHeight - footerHeight : tableHeight, "px")
    },
    props: {
      fixedType: fixedType,
      footerData: footerData,
      tableColumn: tableColumn,
      visibleColumn: visibleColumn,
      size: vSize,
      fixedColumn: fixedColumn
    },
    ref: "".concat(fixedType, "Footer")
  }) : null]);
}

var _default2 = {
  name: 'VxeTable',
  props: {
    /** 基本属性 */
    // 数据
    data: Array,
    // 初始化绑定动态列
    customs: Array,
    // 表格的高度
    height: [Number, String],
    // 表格的最大高度
    maxHeight: [Number, String],
    // 所有列是否允许拖动列宽调整大小
    resizable: {
      type: Boolean,
      default: function _default() {
        return _conf.default.resizable;
      }
    },
    // 是否带有斑马纹
    stripe: {
      type: Boolean,
      default: function _default() {
        return _conf.default.stripe;
      }
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: function _default() {
        return _conf.default.border;
      }
    },
    // 表格的尺寸
    size: {
      type: String,
      default: function _default() {
        return _conf.default.size;
      }
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: function _default() {
        return _conf.default.fit;
      }
    },
    // 表格是否加载中
    loading: Boolean,
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: function _default() {
        return _conf.default.showHeader;
      }
    },
    // 只对 type=index 时有效，自定义序号的起始值
    startIndex: {
      type: Number,
      default: 0
    },
    // 是否要高亮当前选中行
    highlightCurrentRow: Boolean,
    // 鼠标移到行是否要高亮显示
    highlightHoverRow: Boolean,
    // 是否要高亮当前选中列
    highlightCurrentColumn: Boolean,
    // 鼠标移到列是否要高亮显示
    highlightHoverColumn: Boolean,
    // 激活单元格编辑时是否高亮显示
    highlightCell: Boolean,
    // 是否显示表尾合计
    showFooter: Boolean,
    // 表尾合计的计算方法
    footerMethod: Function,
    // 给行附加 className
    rowClassName: [String, Function],
    // 给单元格附加 className
    cellClassName: [String, Function],
    // 给表头的行附加 className
    headerRowClassName: [String, Function],
    // 给表头的单元格附加 className
    headerCellClassName: [String, Function],
    // 给表尾的行附加 className
    footerRowClassName: [String, Function],
    // 给表尾的单元格附加 className
    footerCellClassName: [String, Function],
    // 合并行或列
    spanMethod: Function,
    // 设置所有内容过长时显示为省略号
    showOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showOverflow;
      }
    },
    // 设置表头所有内容过长时显示为省略号
    showHeaderOverflow: {
      type: [Boolean, String],
      default: function _default() {
        return _conf.default.showHeaderOverflow;
      }
    },
    // 是否服务端筛选
    remoteFilter: Boolean,

    /** 高级属性 */
    // 行数据的 Key
    rowKey: [String, Number],
    // 是否自动根据父容器响应式调整表格宽高
    autoResize: Boolean,
    // 单选配置
    radioConfig: Object,
    // 多选配置项
    selectConfig: Object,
    // tooltip 配置项
    tooltipConfig: Object,
    // 展开行配置项
    expandConfig: Object,
    // 树形结构配置项
    treeConfig: Object,
    // 快捷菜单配置项
    contextMenu: Object,
    // 鼠标配置项
    mouseConfig: Object,
    // 按键配置项
    keyboardConfig: Object,
    // 编辑配置项
    editConfig: Object,
    // 校验配置项
    validConfig: Object,
    // 校验规则配置项
    editRules: Object,
    // 优化配置项
    optimization: Object
  },
  provide: function provide() {
    return {
      $table: this
    };
  },
  data: function data() {
    return {
      id: _xeUtils.default.uniqueId(),
      // 分组表头的属性
      headerProps: {
        children: 'children'
      },
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
      tableColumn: [],
      // 渲染中的数据
      tableData: [],
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollYWidth: 0,
      // 横向滚动条的高度
      scrollXHeight: 0,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 单选属性，选中行
      selectRow: null,
      // 已展开的行
      expandeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放可编辑相关信息
      editStore: {
        indexs: {
          columns: []
        },
        titles: {
          columns: []
        },
        // 所有选中
        checked: {
          rows: [],
          columns: [],
          tRows: [],
          tColumns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        insertList: [],
        removeList: []
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null,
        isArrow: false
      }
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    optimizeOpts: function optimizeOpts() {
      return Object.assign({}, _conf.default.optimization, this.optimization);
    },
    // 是否使用了分组表头
    isGroup: function isGroup() {
      return this.collectColumn.some(function (column) {
        return _tools.UtilTools.hasChildrenList(column);
      });
    },
    hasTip: function hasTip() {
      return _conf.default._tip;
    },
    visibleColumn: function visibleColumn() {
      return this.tableFullColumn ? this.tableFullColumn.filter(function (column) {
        return column.visible;
      }) : [];
    },
    isResizable: function isResizable() {
      return this.resizable || this.tableFullColumn.some(function (column) {
        return column.resizable;
      });
    },
    hasFilter: function hasFilter() {
      return this.tableColumn.some(function (column) {
        return column.filters && column.filters.length;
      });
    },
    headerCtxMenu: function headerCtxMenu() {
      return this.ctxMenuConfig.header && this.ctxMenuConfig.header.options ? this.ctxMenuConfig.header.options : [];
    },
    bodyCtxMenu: function bodyCtxMenu() {
      return this.ctxMenuConfig.body && this.ctxMenuConfig.body.options ? this.ctxMenuConfig.body.options : [];
    },
    isCtxMenu: function isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length;
    },
    ctxMenuConfig: function ctxMenuConfig() {
      return Object.assign({}, _conf.default.menu, this.contextMenu);
    },
    ctxMenuList: function ctxMenuList() {
      var rest = [];
      this.ctxMenuStore.list.forEach(function (list) {
        list.forEach(function (item) {
          rest.push(item);
        });
      });
      return rest;
    },
    footerData: function footerData() {
      var showFooter = this.showFooter,
          visibleColumn = this.visibleColumn,
          tableFullData = this.tableFullData,
          data = this.data,
          footerMethod = this.footerMethod;
      return showFooter && footerMethod && (visibleColumn.length || data) ? footerMethod({
        columns: visibleColumn,
        data: tableFullData
      }) : ['-'];
    }
  },
  watch: {
    data: function data(value) {
      if (!this._isUpdateData) {
        this.loadData(value, true).then(this.handleDefaultExpand);
      }

      this._isUpdateData = false;
    },
    customs: function customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },
    collectColumn: function collectColumn(value) {
      var tableFullColumn = _tools.UtilTools.getColumnList(value);

      this.tableFullColumn = tableFullColumn;
      this.cacheColumnMap(); // 在 v3.0 中废弃

      if (tableFullColumn.length) {
        var cIndex = Math.floor((tableFullColumn.length - 1) / 2);

        if (tableFullColumn[cIndex].prop) {
          console.warn('[vxe-table] The property prop is deprecated, please use field');
        }

        if (tableFullColumn[cIndex].label) {
          console.warn('[vxe-table] The property label is deprecated, please use title');
        }
      }
    },
    tableColumn: function tableColumn() {
      this.analyColumnWidth();
    },
    height: function height() {
      this.$nextTick(this.recalculate);
    },
    loading: function loading() {
      if (!this._isLoading) {
        this._isLoading = true;
      }
    }
  },
  created: function created() {
    var _this = this;

    var _Object$assign = Object.assign(this, {
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {},
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {},
      // 存放 tooltip 相关信息
      tooltipStore: {},
      // 表格父容器的高度
      parentHeight: 0,
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 单选属性，选中列
      // selectColumn: null,
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      // 缓存数据集
      fullDataIndexMap: new Map(),
      fullDataRowIdMap: new Map(),
      fullColumnIdMap: new Map(),
      fullColumnIndexMap: new Map()
    }),
        scrollYStore = _Object$assign.scrollYStore,
        optimizeOpts = _Object$assign.optimizeOpts,
        selectConfig = _Object$assign.selectConfig,
        data = _Object$assign.data,
        treeConfig = _Object$assign.treeConfig,
        editConfig = _Object$assign.editConfig,
        loading = _Object$assign.loading;

    var scrollY = optimizeOpts.scrollY; // 是否加载过 Loading 模块

    this._isLoading = loading;

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        adaptive: _xeUtils.default.isBoolean(scrollY.adaptive) ? scrollY.adaptive : true,
        renderSize: scrollY.rSize,
        offsetSize: scrollY.oSize
      });
    }

    var rowKey = _tools.UtilTools.getRowKey(this);

    if (selectConfig && selectConfig.reserve && !rowKey) {
      throw new Error('[vxe-table] Checkbox status reserve must have a unique primary key.');
    } else if (treeConfig && !rowKey) {
      throw new Error('[vxe-table] Tree table must have a unique primary key.');
    } else if (editConfig && !rowKey) {
      throw new Error('[vxe-table] Editable must have a unique primary key.');
    }

    this.loadData(data, true).then(function () {
      var customs = _this.customs,
          collectColumn = _this.collectColumn;
      _this.tableFullColumn = _tools.UtilTools.getColumnList(collectColumn);

      if (customs) {
        _this.mergeCustomColumn(customs);
      }

      _this.refreshColumn();

      _this.handleDefaultExpand();

      _this.updateStyle();
    });

    _tools.GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);

    _tools.GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);

    _tools.GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);

    _tools.GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);

    _tools.GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);

    _tools.GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
  },
  mounted: function mounted() {
    if (this.autoResize) {
      _tools.ResizeEvent.on(this, this.$el.parentNode, this.recalculate);
    }

    document.body.appendChild(this.$refs.tableWrapper);
  },
  activated: function activated() {
    var bodyElem = this.$refs.tableBody.$el;

    if (bodyElem) {
      var lastScrollTop = this.lastScrollTop,
          lastScrollLeft = this.lastScrollLeft;

      if (lastScrollTop) {
        bodyElem.scrollTop = lastScrollTop;
      }

      if (lastScrollLeft) {
        bodyElem.scrollLeft = lastScrollLeft;
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    var tableWrapper = this.$refs.tableWrapper;

    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper);
    }

    if (_tools.ResizeEvent.off) {
      _tools.ResizeEvent.off(this, this.$el.parentNode);
    }

    this.afterFullData.length = 0;
    this.fullDataIndexMap.clear();
    this.fullColumnIndexMap.clear();
    this.closeFilter();
    this.closeMenu();
  },
  destroyed: function destroyed() {
    _tools.GlobalEvent.off(this, 'mousedown');

    _tools.GlobalEvent.off(this, 'blur');

    _tools.GlobalEvent.off(this, 'contextmenu');

    _tools.GlobalEvent.off(this, 'mousewheel');

    _tools.GlobalEvent.off(this, 'keydown');

    _tools.GlobalEvent.off(this, 'resize');
  },
  render: function render(h) {
    var _class;

    var _e = this._e,
        id = this.id,
        tableData = this.tableData,
        tableColumn = this.tableColumn,
        visibleColumn = this.visibleColumn,
        collectColumn = this.collectColumn,
        isGroup = this.isGroup,
        hasFilter = this.hasFilter,
        isResizable = this.isResizable,
        isCtxMenu = this.isCtxMenu,
        loading = this.loading,
        _isLoading = this._isLoading,
        showHeader = this.showHeader,
        border = this.border,
        stripe = this.stripe,
        highlightHoverRow = this.highlightHoverRow,
        highlightHoverColumn = this.highlightHoverColumn,
        highlightCell = this.highlightCell,
        vSize = this.vSize,
        editConfig = this.editConfig,
        _this$validConfig = this.validConfig,
        validConfig = _this$validConfig === void 0 ? {} : _this$validConfig,
        _this$mouseConfig = this.mouseConfig,
        mouseConfig = _this$mouseConfig === void 0 ? {} : _this$mouseConfig,
        editRules = this.editRules,
        showFooter = this.showFooter,
        footerMethod = this.footerMethod,
        overflowX = this.overflowX,
        overflowY = this.overflowY,
        scrollXHeight = this.scrollXHeight,
        optimizeOpts = this.optimizeOpts,
        columnStore = this.columnStore,
        filterStore = this.filterStore,
        ctxMenuStore = this.ctxMenuStore,
        tooltipConfig = this.tooltipConfig,
        validStore = this.validStore,
        footerData = this.footerData,
        hasTip = this.hasTip;
    var leftList = columnStore.leftList,
        rightList = columnStore.rightList;
    return h('div', {
      class: (_class = {
        'vxe-table': 1
      }, _defineProperty(_class, "size--".concat(vSize), vSize), _defineProperty(_class, 'vxe-editable', editConfig), _defineProperty(_class, 'show--head', showHeader), _defineProperty(_class, 'show--foot', showFooter), _defineProperty(_class, 'scroll--y', overflowY), _defineProperty(_class, 'scroll--x', overflowX), _defineProperty(_class, 'fixed--left', leftList.length), _defineProperty(_class, 'fixed--right', rightList.length), _defineProperty(_class, 'c--highlight', highlightCell), _defineProperty(_class, 't--animat', optimizeOpts.animat), _defineProperty(_class, 't--stripe', stripe), _defineProperty(_class, 't--border', border), _defineProperty(_class, 't--checked', mouseConfig.checked), _defineProperty(_class, 'is--loading', loading), _defineProperty(_class, 'row--highlight', highlightHoverRow), _defineProperty(_class, 'column--highlight', highlightHoverColumn), _class)
    }, [
    /**
     * 隐藏列
     */
    h('div', {
      class: 'vxe-table-hidden-column',
      ref: 'hideColumn'
    }, this.$slots.default),
    /**
     * 主头部
     */
    showHeader ? h('vxe-table-header', {
      ref: 'tableHeader',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }) : _e(),
    /**
     * 主内容
     */
    h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData: tableData,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        collectColumn: collectColumn,
        size: vSize,
        isGroup: isGroup
      }
    }),
    /**
     * 底部汇总
     */
    showFooter ? h('vxe-table-footer', {
      props: {
        footerData: footerData,
        footerMethod: footerMethod,
        tableColumn: tableColumn,
        visibleColumn: visibleColumn,
        size: vSize
      },
      ref: 'tableFooter'
    }) : _e(),
    /**
     * 左侧固定列
     */
    leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
    /**
     * 右侧固定列
     */
    rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
    /**
     * 列宽线
     */
    isResizable ? h('div', {
      class: 'vxe-table--resizable-bar',
      style: overflowX ? {
        'padding-bottom': "".concat(scrollXHeight, "px")
      } : null,
      ref: 'resizeBar'
    }) : _e(),
    /**
     * 加载中
     */
    _isLoading ? h('vxe-table-loading', {
      props: {
        visible: loading
      }
    }) : _e(), h('div', {
      class: "vxe-table".concat(id, "-wrapper"),
      ref: 'tableWrapper'
    }, [
    /**
     * 筛选
     */
    hasFilter ? h('vxe-table-filter', {
      props: {
        optimizeOpts: optimizeOpts,
        filterStore: filterStore
      },
      ref: 'filterWrapper'
    }) : _e(),
    /**
     * 快捷菜单
     */
    isCtxMenu ? h('vxe-table-context-menu', {
      props: {
        ctxMenuStore: ctxMenuStore
      },
      ref: 'ctxWrapper'
    }) : _e(),
    /**
     * Ellipsis tooltip
     */
    hasTip ? h('vxe-tooltip', {
      ref: 'tooltip'
    }) : _e(),
    /**
     * valid error tooltip
     */
    hasTip && editRules && validConfig.message !== 'none' ? h('vxe-tooltip', {
      class: 'vxe-table--valid-error',
      props: validConfig.message === 'tooltip' || tableData.length === 1 ? Object.assign({}, validStore, tooltipConfig) : null,
      ref: 'validTip'
    }) : _e()])]);
  },
  methods: {
    clearAll: function clearAll() {
      this.clearScroll();
      this.clearSort();
      this.clearFilter();
      this.clearCurrentRow();
      this.clearCurrentColumn();
      this.clearSelection();
      this.clearRowExpand();
      this.clearTreeExpand();
      this.clearIndexChecked();
      this.clearHeaderChecked();
      this.clearChecked();
      this.clearSelected();
      return this.clearActived();
    },
    loadData: function loadData(datas, notRefresh) {
      var height = this.height,
          maxHeight = this.maxHeight,
          editStore = this.editStore,
          optimizeOpts = this.optimizeOpts,
          recalculate = this.recalculate;
      var scrollY = optimizeOpts.scrollY;
      var tableFullData = datas || [];
      var scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
      editStore.insertList = [];
      editStore.removeList = []; // 原始数据

      this.tableSourceData = _xeUtils.default.clone(tableFullData, true); // 全量数据

      this.tableFullData = tableFullData;
      this.scrollYLoad = scrollYLoad;

      if (scrollYLoad && !(height || maxHeight)) {
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.');
      }

      this.tableData = this.getTableData(true).tableData;
      this.cacheDataMap();
      this.reserveCheckSelection();
      this.checkSelectionStatus();
      var rest = this.$nextTick();

      if (!notRefresh) {
        rest = rest.then(recalculate);
      }

      return rest;
    },
    reloadData: function reloadData(datas) {
      this.clearAll();
      return this.loadData(datas).then(this.handleDefaultExpand);
    },
    loadColumn: function loadColumn(columns) {
      var _this2 = this;

      var collectColumn = _xeUtils.default.mapTree(columns, function (column) {
        return _cell.default.createColumn(_this2, column);
      }, this.headerProps);

      this.collectColumn = collectColumn;
      this.tableFullColumn = _tools.UtilTools.getColumnList(collectColumn);

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.cacheColumnMap();
      this.refreshColumn();
      return this.$nextTick();
    },
    reloadColumn: function reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },
    // 更新数据的 Map
    cacheDataMap: function cacheDataMap() {
      var _this3 = this;

      var treeConfig = this.treeConfig,
          tableFullData = this.tableFullData,
          fullDataIndexMap = this.fullDataIndexMap,
          fullDataRowIdMap = this.fullDataRowIdMap;
      fullDataIndexMap.clear();
      fullDataRowIdMap.clear();

      if (treeConfig) {
        var rowKey = _tools.UtilTools.getRowKey(this);

        _xeUtils.default.eachTree(tableFullData, function (row, index) {
          fullDataRowIdMap.set('' + _xeUtils.default.get(row, rowKey), {
            rowKey: rowKey,
            row: row,
            index: index
          });
        }, treeConfig);
      } else {
        tableFullData.forEach(function (row, rowIndex) {
          fullDataRowIdMap.set(_tools.UtilTools.getRowId(_this3, row, rowIndex), {
            row: row,
            index: rowIndex
          });
          fullDataIndexMap.set(row, {
            row: row,
            index: rowIndex
          });
        });
      }
    },
    // 更新列的 Map
    cacheColumnMap: function cacheColumnMap() {
      var tableFullColumn = this.tableFullColumn,
          fullColumnIdMap = this.fullColumnIdMap,
          fullColumnIndexMap = this.fullColumnIndexMap;
      fullColumnIdMap.clear();
      fullColumnIndexMap.clear();
      tableFullColumn.forEach(function (column, index) {
        fullColumnIdMap.set(column.id, column);
        fullColumnIndexMap.set(column, {
          column: column,
          index: index
        });
      });
    },
    getRowMapIndex: function getRowMapIndex(row) {
      return this.fullDataIndexMap.has(row) ? this.fullDataIndexMap.get(row).index : -1;
    },
    getRowIndex: function getRowIndex(row) {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;
      return treeConfig ? _xeUtils.default.findTree(tableFullData, function (item) {
        return item === row;
      }, treeConfig) : this.getRowMapIndex(row);
    },
    getColumnMapIndex: function getColumnMapIndex(column) {
      return this.fullColumnIndexMap.has(column) ? this.fullColumnIndexMap.get(column).index : -1;
    },
    getColumnIndex: function getColumnIndex(column) {
      return this.getColumnMapIndex(column);
    },
    insert: function insert(records) {
      return this.insertAt(records);
    },

    /**
     * 从指定行插入数据
     */
    insertAt: function insertAt(records, row) {
      var _this4 = this,
          _arguments = arguments;

      var tableData = this.tableData,
          editStore = this.editStore,
          defineProperty = this.defineProperty,
          scrollYLoad = this.scrollYLoad,
          tableFullData = this.tableFullData;

      if (!_xeUtils.default.isArray(records)) {
        records = [records];
      }

      var newRecords = records.map(function (record) {
        return defineProperty(record);
      });
      return new Promise(function (resolve) {
        if (_arguments.length === 1) {
          tableData.unshift.apply(tableData, newRecords);

          if (scrollYLoad) {
            tableFullData.unshift.apply(tableFullData, newRecords);

            _this4.updateAfterFullData();
          }
        } else {
          if (scrollYLoad) {
            throw new Error('[vxe-table] Virtual scroller does not support this operation.');
          }

          if (row === -1) {
            tableData.push.apply(tableData, newRecords);
          } else {
            var rowIndex = tableData.indexOf(row);
            tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords));
          }
        }

        [].unshift.apply(editStore.insertList, newRecords);

        _this4.checkSelectionStatus();

        _this4.$nextTick(function () {
          _this4.recalculate();

          resolve({
            row: newRecords.length ? newRecords[newRecords.length - 1] : null,
            rows: newRecords
          });
        });
      });
    },
    defineProperty: function defineProperty(record) {
      var recordItem = Object.assign({}, record);

      var rowKey = _tools.UtilTools.getRowKey(this);

      this.visibleColumn.forEach(function (column) {
        if (column.property && !_xeUtils.default.has(recordItem, column.property)) {
          _xeUtils.default.set(recordItem, column.property, null);
        }
      }); // 如果设置了 Key 就必须要唯一，可以自行设置；如果为空，则默认生成一个随机数

      if (rowKey && !_xeUtils.default.get(recordItem, rowKey)) {
        _xeUtils.default.set(recordItem, rowKey, ++rowUniqueId + Date.now());
      }

      return recordItem;
    },

    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove: function remove(rows) {
      var _this5 = this;

      var tableData = this.tableData,
          tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig = this.selectConfig,
          selectConfig = _this$selectConfig === void 0 ? {} : _this$selectConfig,
          selection = this.selection,
          hasRowInsert = this.hasRowInsert;
      var removeList = editStore.removeList,
          insertList = editStore.insertList;
      var property = selectConfig.checkField;
      var rest = [];
      this._isUpdateData = true;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig) {
          rows.forEach(function (row) {
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (matchObj) {
              var item = matchObj.item,
                  items = matchObj.items,
                  index = matchObj.index; // 如果是新增，则保存记录

              if (!hasRowInsert(item)) {
                removeList.push(item);
              } // 从树节点中移除


              var restRow = items.splice(index, 1)[0]; // 如果绑定了多选属性，则更新状态

              if (!property) {
                _xeUtils.default.remove(selection, function (row) {
                  return rows.indexOf(row) > -1;
                });
              }

              rest.push(restRow);
            }
          });
        } else {
          // 如果是新增，则保存记录
          rows.forEach(function (row) {
            if (!hasRowInsert(row)) {
              removeList.push(row);
            }
          }); // 从数据源中移除

          rest = _xeUtils.default.remove(tableFullData, function (row) {
            return rows.indexOf(row) > -1;
          }); // 如果绑定了多选属性，则更新状态

          if (!property) {
            _xeUtils.default.remove(selection, function (row) {
              return rows.indexOf(row) > -1;
            });
          } // 从列表中移除


          _xeUtils.default.remove(tableData, function (row) {
            return rows.indexOf(row) > -1;
          });
        }

        _xeUtils.default.remove(insertList, function (row) {
          return rows.indexOf(row) > -1;
        });
      }

      this.checkSelectionStatus();
      return this.$nextTick().then(function () {
        _this5.recalculate();

        return {
          row: rows && rows.length ? rows[rows.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除选中数据
     */
    removeSelecteds: function removeSelecteds() {
      var _this6 = this;

      return this.remove(this.getSelectRecords()).then(function (params) {
        _this6.clearSelection();

        return params;
      });
    },

    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 field 则还原指定单元格
     */
    revert: function revert(rows, field) {
      var tableSourceData = this.tableSourceData,
          tableFullData = this.tableFullData;

      if (arguments.length) {
        if (rows && !_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(function (row) {
          var rowIndex = tableFullData.indexOf(row);
          var oRow = tableSourceData[rowIndex];

          if (oRow && row) {
            if (field) {
              _xeUtils.default.set(row, field, _xeUtils.default.get(oRow, field));
            } else {
              _xeUtils.default.destructuring(row, oRow);
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    },

    /**
     * 清空单元格内容
     * 如果不创参数，则清空整个表格内容
     * 如果传 row 则清空一行内容
     * 如果传 rows 则清空多行内容
     * 如果还额外传了 field 则清空指定单元格内容
     */
    clearData: function clearData(rows, field) {
      var tableSourceData = this.tableSourceData,
          visibleColumn = this.visibleColumn;

      if (!arguments.length) {
        rows = tableSourceData;
      } else if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      if (field) {
        rows.forEach(function (row) {
          return _xeUtils.default.set(row, field, null);
        });
      } else {
        rows.forEach(function (row) {
          visibleColumn.forEach(function (column) {
            if (column.property) {
              _tools.UtilTools.setCellValue(row, column, null);
            }
          });
        });
      }

      return this.$nextTick();
    },
    hasRowInsert: function hasRowInsert(row) {
      var treeConfig = this.treeConfig;

      if (treeConfig) {
        return _xeUtils.default.findTree(this.tableSourceData, function (item) {
          return item === row;
        }, treeConfig);
      }

      return this.getRowMapIndex(row) === -1;
    },
    hasRowChange: function hasRowChange(row, field) {
      var oRow;
      var tableSourceData = this.tableSourceData,
          fullDataIndexMap = this.fullDataIndexMap;

      if (!fullDataIndexMap.has(row)) {
        return false;
      }

      var rowKey = _tools.UtilTools.getRowKey(this);

      if (rowKey) {
        var rowId = _xeUtils.default.get(row, rowKey);

        var treeConfig = this.treeConfig;

        if (treeConfig) {
          var children = treeConfig.children;

          var matchObj = _xeUtils.default.findTree(tableSourceData, function (row) {
            return rowId === _xeUtils.default.get(row, rowKey);
          }, treeConfig);

          row = Object.assign({}, row, _defineProperty({}, children, null));

          if (matchObj) {
            oRow = Object.assign({}, matchObj.item, _defineProperty({}, children, null));
          }
        } else {
          var oRowIndex = this.fullDataRowIdMap.get("".concat(rowId)).index;
          oRow = tableSourceData[oRowIndex];
        }
      } else {
        var _oRowIndex = this.getRowMapIndex(row);

        oRow = tableSourceData[_oRowIndex];
      }

      if (arguments.length > 1) {
        return oRow && !_xeUtils.default.isEqual(_xeUtils.default.get(oRow, field), _xeUtils.default.get(row, field));
      }

      return oRow && !_xeUtils.default.isEqual(oRow, row);
    },

    /**
     * 获取表格所有列
     */
    getColumns: function getColumns(columnIndex) {
      var columns = this.visibleColumn;
      return arguments.length ? columns[columnIndex] : columns;
    },

    /**
     * 获取表格所有数据
     */
    getRecords: function getRecords(rowIndex) {
      var tableFullData = this.tableFullData;
      return arguments.length ? tableFullData[rowIndex] : tableFullData;
    },

    /**
     * 获取表格数据集合
     */
    getAllRecords: function getAllRecords() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增数据
     */
    getInsertRecords: function getInsertRecords() {
      return this.editStore.insertList;
    },

    /**
     * 获取删除数据
     */
    getRemoveRecords: function getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * 获取选中数据
     */
    getSelectRecords: function getSelectRecords() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          treeConfig = this.treeConfig,
          _this$selectConfig2 = this.selectConfig,
          selectConfig = _this$selectConfig2 === void 0 ? {} : _this$selectConfig2;
      var property = selectConfig.checkField;
      var rowList = [];
      var insList = [];

      if (property) {
        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return _xeUtils.default.get(row, property);
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return _xeUtils.default.get(row, property);
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return _xeUtils.default.get(row, property);
        });
      } else {
        var selection = this.selection;

        if (treeConfig) {
          rowList = _xeUtils.default.filterTree(tableFullData, function (row) {
            return selection.indexOf(row) > -1;
          }, treeConfig);
        } else {
          rowList = tableFullData.filter(function (row) {
            return selection.indexOf(row) > -1;
          });
        }

        insList = editStore.insertList.filter(function (row) {
          return selection.indexOf(row) > -1;
        });
      }

      return rowList.concat(insList);
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords: function getUpdateRecords() {
      var tableFullData = this.tableFullData,
          hasRowChange = this.hasRowChange,
          treeConfig = this.treeConfig;

      if (treeConfig) {
        return _xeUtils.default.filterTree(tableFullData, hasRowChange);
      }

      return tableFullData.filter(hasRowChange);
    },

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData: function updateAfterFullData() {
      var visibleColumn = this.visibleColumn,
          tableFullData = this.tableFullData,
          remoteFilter = this.remoteFilter;
      var column = visibleColumn.find(function (column) {
        return column.order;
      });
      var tableData = tableFullData;
      var filterColumn = visibleColumn.filter(function (_ref) {
        var filters = _ref.filters;
        return filters && filters.length;
      });
      tableData = tableData.filter(function (row) {
        return filterColumn.every(function (column) {
          var filters = column.filters,
              filterRender = column.filterRender;
          var compConf = filterRender ? _vXETable.Renderer.get(filterRender.name) : null;
          var valueList = [];
          var itemList = [];

          if (filters && filters.length) {
            filters.forEach(function (item) {
              if (item.checked) {
                itemList.push(item);
                valueList.push(item.value);
              }
            });

            if (valueList.length && !remoteFilter) {
              var property = column.property,
                  filterMethod = column.filterMethod;

              if (!filterMethod && compConf && compConf.renderFilter) {
                filterMethod = compConf.filterMethod;
              }

              return filterMethod ? itemList.some(function (item) {
                return filterMethod({
                  value: item.value,
                  option: item,
                  row: row,
                  column: column
                });
              }) : valueList.indexOf(_xeUtils.default.get(row, property)) > -1;
            }
          }

          return true;
        });
      });

      if (column && column.order) {
        var rest = _xeUtils.default.sortBy(tableData, column.property);

        tableData = column.order === 'desc' ? rest.reverse() : rest;
      }

      this.afterFullData = tableData;
      return tableData;
    },

    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData: function getTableData(force) {
      var scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      var fullData = force ? this.updateAfterFullData() : this.afterFullData;
      return {
        fullData: fullData,
        tableData: scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      };
    },
    handleDefaultExpand: function handleDefaultExpand() {
      if (this.selectConfig) {
        this.handleDefaultRowChecked();
      }

      if (this.expandConfig) {
        this.handleDefaultRowExpand();
      }

      if (this.treeConfig) {
        this.handleDefaultTreeExpand();
      }

      this.$nextTick(this.recalculate);
    },

    /**
     * 动态列处理
     */
    mergeCustomColumn: function mergeCustomColumn(customColumns) {
      var tableFullColumn = this.tableFullColumn;
      this.isUpdateCustoms = true;
      tableFullColumn.forEach(function (column) {
        var item = customColumns.find(function (item) {
          return column.property && (item.field || item.prop) === column.property;
        });
        column.visible = item ? !!item.visible : true;
      });
      this.$emit('update:customs', tableFullColumn);
    },

    /**
     * 初始化加载动态列
     */
    reloadCustoms: function reloadCustoms(customColumns) {
      var _this7 = this;

      return this.$nextTick().then(function () {
        _this7.mergeCustomColumn(customColumns);

        return _this7.refreshColumn().then(function () {
          return _this7.tableFullColumn;
        });
      });
    },

    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn: function refreshColumn() {
      var isColspan;
      var letIndex = 0;
      var leftList = [];
      var rightIndex = 0;
      var centerList = [];
      var rightList = [];
      var headerProps = this.headerProps,
          tableFullColumn = this.tableFullColumn,
          isGroup = this.isGroup,
          columnStore = this.columnStore,
          scrollXStore = this.scrollXStore,
          optimizeOpts = this.optimizeOpts;
      var scrollX = optimizeOpts.scrollX; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

      if (isGroup) {
        _xeUtils.default.eachTree(this.collectColumn, function (column) {
          if (column.children && column.children.length) {
            column.visible = !!_xeUtils.default.findTree(column.children, function (subColumn) {
              return subColumn.children && subColumn.children.length ? 0 : subColumn.visible;
            }, headerProps);
          }
        }, headerProps);
      } // 重新分配列


      tableFullColumn.filter(function (column) {
        return column.visible;
      }).forEach(function (column, columnIndex) {
        if (column.fixed === 'left') {
          if (!isColspan) {
            if (columnIndex - letIndex !== 0) {
              isColspan = true;
            } else {
              letIndex++;
            }
          }

          leftList.push(column);
        } else if (column.fixed === 'right') {
          if (!isColspan) {
            if (!rightIndex) {
              rightIndex = columnIndex;
            }

            if (columnIndex - rightIndex !== 0) {
              isColspan = true;
            } else {
              rightIndex++;
            }
          }

          rightList.push(column);
        } else {
          centerList.push(column);
        }
      });
      var visibleColumn = leftList.concat(centerList).concat(rightList);
      var scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length;
      Object.assign(columnStore, {
        leftList: leftList,
        centerList: centerList,
        rightList: rightList
      });

      if (isColspan && isGroup || rightIndex && rightIndex !== visibleColumn.length) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.');
      }

      if (scrollXLoad) {
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          adaptive: _xeUtils.default.isBoolean(scrollX.adaptive) ? scrollX.adaptive : true,
          renderSize: scrollX.rSize,
          offsetSize: scrollX.oSize
        });
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      }

      this.scrollXLoad = scrollXLoad;
      this.tableColumn = visibleColumn; // 需要计算两次，解决隐藏列首次被显示无宽度造成闪动问题

      return this.$nextTick().then(this.recalculate).then(this.recalculate);
    },

    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth: function analyColumnWidth() {
      var resizeList = [];
      var pxList = [];
      var pxMinList = [];
      var scaleList = [];
      var scaleMinList = [];
      var autoList = [];
      this.tableFullColumn.forEach(function (column) {
        if (column.visible) {
          if (column.resizeWidth) {
            resizeList.push(column);
          } else if (_tools.DomTools.isPx(column.width)) {
            pxList.push(column);
          } else if (_tools.DomTools.isScale(column.width)) {
            scaleList.push(column);
          } else if (_tools.DomTools.isPx(column.minWidth)) {
            pxMinList.push(column);
          } else if (_tools.DomTools.isScale(column.minWidth)) {
            scaleMinList.push(column);
          } else {
            autoList.push(column);
          }
        }
      });
      Object.assign(this.columnStore, {
        resizeList: resizeList,
        pxList: pxList,
        pxMinList: pxMinList,
        scaleList: scaleList,
        scaleMinList: scaleMinList,
        autoList: autoList
      });
    },

    /**
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate: function recalculate(refull) {
      var _this8 = this;

      var _this$$refs = this.$refs,
          tableBody = _this$$refs.tableBody,
          tableHeader = _this$$refs.tableHeader,
          tableFooter = _this$$refs.tableFooter;
      var bodyElem = tableBody ? tableBody.$el : null;
      var headerElem = tableHeader ? tableHeader.$el : null;
      var footerElem = tableFooter ? tableFooter.$el : null;

      if (bodyElem) {
        var bodyWidth = bodyElem.clientWidth;
        var tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);

        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.$nextTick().then(function () {
            bodyWidth = bodyElem.clientWidth;

            if (bodyWidth !== tableWidth) {
              _this8.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);
            }

            _this8.computeScrollLoad();
          });
        }
      }

      return this.$nextTick().then(this.computeScrollLoad);
    },
    // 列宽计算
    autoCellWidth: function autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth) {
      var meanWidth;
      var tableWidth = 0;
      var minCellWidth = 40; // 列宽最少限制 40px

      var remainWidth = bodyWidth;
      var $el = this.$el,
          fit = this.fit,
          columnStore = this.columnStore;
      var resizeList = columnStore.resizeList,
          pxMinList = columnStore.pxMinList,
          pxList = columnStore.pxList,
          scaleList = columnStore.scaleList,
          scaleMinList = columnStore.scaleMinList,
          autoList = columnStore.autoList; // 最小宽

      pxMinList.forEach(function (column) {
        var minWidth = parseInt(column.minWidth);
        tableWidth += minWidth;
        column.renderWidth = minWidth;
      }); // 最小百分比

      meanWidth = remainWidth / 100;
      scaleMinList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定百分比

      scaleList.forEach(function (column) {
        var scaleWidth = Math.floor(parseInt(column.width) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定宽

      pxList.forEach(function (column) {
        var width = parseInt(column.width);
        tableWidth += width;
        column.renderWidth = width;
      }); // 调整了列宽

      resizeList.forEach(function (column) {
        var width = parseInt(column.resizeWidth);
        tableWidth += width;
        column.renderWidth = width;
      });
      remainWidth -= tableWidth;
      meanWidth = remainWidth > 0 ? Math.max(Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)), minCellWidth) : minCellWidth;

      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(function (column) {
            tableWidth += meanWidth;
            column.renderWidth += meanWidth;
          });
        }
      } else {
        meanWidth = minCellWidth;
      } // 自适应


      autoList.forEach(function (column, index) {
        column.renderWidth = meanWidth;
        tableWidth += meanWidth;

        if (fit && index === autoList.length - 1) {
          // 如果所有列足够放的情况下，修补列之间的误差
          var odiffer = bodyWidth - tableWidth;

          if (odiffer > 0) {
            column.renderWidth += odiffer;
            tableWidth = bodyWidth;
          }
        }
      });
      var tableHeight = bodyElem.offsetHeight;
      var scrollYWidth = bodyElem.offsetWidth - bodyWidth;
      this.scrollYWidth = scrollYWidth;
      this.overflowY = scrollYWidth > 0;
      this.tableWidth = tableWidth;
      this.tableHeight = tableHeight;
      this.parentHeight = $el.parentNode.clientHeight;

      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight;
      }

      if (footerElem) {
        var footerHeight = footerElem.offsetHeight;
        this.scrollXHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
        this.overflowX = tableWidth > footerElem.clientWidth;
        this.footerHeight = footerHeight;
      } else {
        this.scrollXHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
        this.overflowX = tableWidth > bodyWidth;
      }

      if (this.overflowX) {
        this.checkScrolling();
      }

      return tableWidth;
    },
    updateStyle: function updateStyle() {
      var $refs = this.$refs,
          fullColumnIdMap = this.fullColumnIdMap,
          maxHeight = this.maxHeight,
          height = this.height,
          parentHeight = this.parentHeight,
          border = this.border,
          tableColumn = this.tableColumn,
          headerHeight = this.headerHeight,
          allColumnHeaderOverflow = this.showHeaderOverflow,
          showFooter = this.showFooter,
          allColumnOverflow = this.showOverflow,
          footerHeight = this.footerHeight,
          tableHeight = this.tableHeight,
          tableWidth = this.tableWidth,
          overflowY = this.overflowY,
          scrollXHeight = this.scrollXHeight,
          scrollYWidth = this.scrollYWidth,
          scrollXLoad = this.scrollXLoad,
          columnStore = this.columnStore,
          elemStore = this.elemStore;
      var containerList = ['main', 'left', 'right'];
      containerList.forEach(function (name, index) {
        var fixedType = index > 0 ? name : '';
        var layoutList = ['header', 'body', 'footer'];
        var fixedColumn = columnStore["".concat(fixedType, "List")];
        var fixedWrapperElem = $refs["".concat(fixedType, "Container")];
        layoutList.forEach(function (layout) {
          var wrapperElem = elemStore["".concat(name, "-").concat(layout, "-wrapper")];
          var tableElem = elemStore["".concat(name, "-").concat(layout, "-table")];

          if (layout === 'header') {
            // 表头体样式处理
            // 横向滚动渲染
            var tWidth = tableWidth;

            if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (tableElem) {
              tableElem.style.width = tWidth === null ? tWidth : "".concat(tWidth + scrollYWidth, "px");
            }

            var repairElem = elemStore["".concat(name, "-").concat(layout, "-repair")];

            if (repairElem) {
              repairElem.style.width = "".concat(tableWidth, "px");
            }

            var listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

            if (listElem) {
              _xeUtils.default.arrayEach(listElem.querySelectorAll(".col--gutter"), function (thElem) {
                thElem.style.width = "".concat(scrollYWidth, "px");
              });
            }
          } else if (layout === 'body') {
            var customHeight = height === 'auto' ? parentHeight : _xeUtils.default.toNumber(height);

            if (wrapperElem) {
              if (customHeight > 0) {
                wrapperElem.style.height = "".concat(fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight, "px");
              } else if (maxHeight) {
                maxHeight = _xeUtils.default.toNumber(maxHeight);
                wrapperElem.style.maxHeight = "".concat(fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight, "px");
              }
            } // 如果是固定列


            if (fixedWrapperElem) {
              var isRightFixed = fixedType === 'right';
              var _fixedColumn = columnStore["".concat(fixedType, "List")];
              fixedWrapperElem.style.height = "".concat((customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollXHeight * (showFooter ? 2 : 1), "px");
              fixedWrapperElem.style.width = "".concat(_fixedColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, isRightFixed ? scrollYWidth : 0), "px");
            }

            var _tWidth = tableWidth; // 如果是固定列与设置了超出隐藏

            if (fixedType && allColumnOverflow) {
              tableColumn = fixedColumn;
              _tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            } else if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              _tWidth = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (tableElem) {
              tableElem.style.width = _tWidth ? "".concat(_tWidth, "px") : _tWidth; // 兼容火狐滚动条

              if (overflowY && fixedType && browse['-moz']) {
                tableElem.style.paddingRight = "".concat(scrollYWidth, "px");
              }
            }
          } else if (layout === 'footer') {
            // 如果是使用优化模式
            var _tWidth2 = tableWidth;

            if (fixedType && allColumnOverflow) {
              tableColumn = fixedColumn;
              _tWidth2 = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            } else if (scrollXLoad) {
              if (fixedType) {
                tableColumn = fixedColumn;
              }

              _tWidth2 = tableColumn.reduce(function (previous, column) {
                return previous + column.renderWidth;
              }, 0);
            }

            if (wrapperElem) {
              wrapperElem.style.marginTop = "".concat(-scrollXHeight - 1, "px");
            }

            if (tableElem) {
              tableElem.style.width = _tWidth2 === null ? _tWidth2 : "".concat(_tWidth2 + scrollYWidth, "px");
            }
          }

          var colgroupElem = elemStore["".concat(name, "-").concat(layout, "-colgroup")];

          if (colgroupElem) {
            _xeUtils.default.arrayEach(colgroupElem.children, function (colElem) {
              var colId = colElem.getAttribute('name');
              var column = fullColumnIdMap.get(colId);

              if (colId === 'col-gutter') {
                colElem.width = "".concat(scrollYWidth || '');
              }

              if (column) {
                colElem.width = "".concat(column.renderWidth || '');

                if (layout === 'header') {
                  var showHeaderOverflow = column.showHeaderOverflow,
                      renderWidth = column.renderWidth;
                  var headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
                  var showEllipsis = headOverflow === 'ellipsis';
                  var showTitle = headOverflow === 'title';
                  var showTooltip = headOverflow === true || headOverflow === 'tooltip';
                  var hasEllipsis = showTitle || showTooltip || showEllipsis;
                  var _listElem = elemStore["".concat(name, "-").concat(layout, "-list")];

                  if (_listElem && hasEllipsis) {
                    _xeUtils.default.arrayEach(_listElem.querySelectorAll(".".concat(column.id)), function (thElem) {
                      var cellElem = thElem.querySelector('.vxe-cell');

                      if (cellElem) {
                        cellElem.style.width = "".concat(border ? renderWidth - 1 : renderWidth, "px");
                      }
                    });
                  }
                } else if (layout === 'body') {
                  // 表主体样式处理
                  var showOverflow = column.showOverflow,
                      _renderWidth = column.renderWidth;
                  var cellOverflow = _xeUtils.default.isUndefined(showOverflow) || _xeUtils.default.isNull(showOverflow) ? allColumnOverflow : showOverflow;

                  var _showEllipsis = cellOverflow === 'ellipsis';

                  var _showTitle = cellOverflow === 'title';

                  var _showTooltip = cellOverflow === true || cellOverflow === 'tooltip';

                  var _hasEllipsis = _showTitle || _showTooltip || _showEllipsis;

                  var _listElem2 = elemStore["".concat(name, "-").concat(layout, "-list")];

                  if (_listElem2 && _hasEllipsis) {
                    _xeUtils.default.arrayEach(_listElem2.querySelectorAll(".".concat(column.id)), function (tdElem) {
                      var cellElem = tdElem.querySelector('.vxe-cell');

                      if (cellElem) {
                        cellElem.style.width = "".concat(border ? _renderWidth - 1 : _renderWidth, "px");
                      }
                    });
                  }
                }
              }
            });
          }
        });
      });
      return this.$nextTick();
    },

    /**
     * 处理固定列的显示状态
     */
    checkScrolling: function checkScrolling() {
      var _this$$refs2 = this.$refs,
          tableBody = _this$$refs2.tableBody,
          leftContainer = _this$$refs2.leftContainer,
          rightContainer = _this$$refs2.rightContainer;
      var bodyElem = tableBody ? tableBody.$el : null;

      if (bodyElem) {
        if (leftContainer) {
          _tools.DomTools[bodyElem.scrollLeft > 0 ? 'addClass' : 'removeClass'](leftContainer, 'scrolling--middle');
        }

        if (rightContainer) {
          _tools.DomTools[bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft ? 'addClass' : 'removeClass'](rightContainer, 'scrolling--middle');
        }
      }
    },
    preventEvent: function preventEvent(evnt, type, args, callback) {
      var _this9 = this;

      var evntList = _vXETable.Interceptor.get(type);

      if (!evntList.some(function (func) {
        return func(args, evnt, _this9) === false;
      })) {
        callback();
      }
    },

    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent: function handleGlobalMousedownEvent(evnt) {
      var _this10 = this;

      var $refs = this.$refs,
          editStore = this.editStore,
          ctxMenuStore = this.ctxMenuStore,
          _this$editConfig = this.editConfig,
          editConfig = _this$editConfig === void 0 ? {} : _this$editConfig,
          filterStore = this.filterStore;
      var actived = editStore.actived;
      var filterWrapper = $refs.filterWrapper,
          validTip = $refs.validTip;

      if (filterWrapper) {
        if (this.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
        } else if (this.getEventTargetNode(evnt, filterWrapper.$el).flag) {// 如果点击筛选容器
        } else {
          this.preventEvent(evnt, 'event.clear_filter', filterStore.args, this.closeFilter);
        }
      } // 如果已激活了编辑状态


      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          if (validTip && this.getEventTargetNode(evnt, validTip.$el).flag) {// 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
            this.preventEvent(evnt, 'event.clear_actived', actived.args, function () {
              var isClear;
              var isReadonlyCol = !_this10.getEventTargetNode(evnt, _this10.$el, 'col--edit').flag; // row 方式

              if (editConfig.mode === 'row') {
                var rowNode = _this10.getEventTargetNode(evnt, _this10.$el, 'vxe-body--row');

                var isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0;

                if (editConfig.trigger === 'manual') {
                  // manual 触发，如果点击了不同行
                  isClear = isOtherRow;
                } else {
                  // click,dblclick 触发，如果点击了不同行的非编辑列
                  isClear = isOtherRow && isReadonlyCol;
                }
              } else {
                // cell 方式，如果是非编辑列
                isClear = isReadonlyCol;
              }

              if (isClear || // 如果点击了当前表格之外
              !_this10.getEventTargetNode(evnt, _this10.$el).flag) {
                setTimeout(_this10.clearActived);
              }
            });
          }
        }
      } // 如果配置了快捷菜单且，点击了其他地方则关闭


      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeMenu();
      }
    },

    /**
     * 窗口失焦事件处理
     */
    handleGlobalBlurEvent: function handleGlobalBlurEvent(evnt) {
      this.closeFilter();
      this.closeMenu();
    },

    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent: function handleGlobalMousewheelEvent(evnt) {
      this.clostTooltip();
      this.closeMenu();
    },

    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent: function handleGlobalKeydownEvent(evnt) {
      var params;
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          editStore = this.editStore,
          _this$mouseConfig2 = this.mouseConfig,
          mouseConfig = _this$mouseConfig2 === void 0 ? {} : _this$mouseConfig2,
          _this$keyboardConfig = this.keyboardConfig,
          keyboardConfig = _this$keyboardConfig === void 0 ? {} : _this$keyboardConfig;
      var selected = editStore.selected,
          actived = editStore.actived;
      var keyCode = evnt.keyCode;
      var isBack = keyCode === 8;
      var isTab = keyCode === 9;
      var isEnter = keyCode === 13;
      var isEsc = keyCode === 27;
      var isSpacebar = keyCode === 32;
      var isLeftArrow = keyCode === 37;
      var isUpArrow = keyCode === 38;
      var isRightArrow = keyCode === 39;
      var isDwArrow = keyCode === 40;
      var isDel = keyCode === 46;
      var isC = keyCode === 67;
      var isV = keyCode === 86;
      var isX = keyCode === 88;
      var isF2 = keyCode === 113;
      var isCtrlKey = evnt.ctrlKey;
      var operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
      var operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);

      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        this.closeMenu();
        this.closeFilter(); // 如果是激活编辑状态，则取消编辑

        if (actived.row) {
          params = actived.args;
          this.clearActived(evnt); // 如果配置了选中功能，则为选中状态

          if (mouseConfig.selected) {
            this.handleSelected(params, evnt);
          }
        }
      } else if (isEnter && (keyboardConfig.isArrow || keyboardConfig.isTab) && (selected.row || actived.row)) {
        // 如果是激活状态，退则出到下一行
        this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
      } else if (operCtxMenu) {
        // 如果配置了右键菜单; 支持方向键操作、回车
        evnt.preventDefault();

        if (ctxMenuStore.showChild && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
        } else {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList);
        }
      } else if (isF2) {
        // 如果按下了 F2 键
        if (selected.row && selected.column) {
          this.handleActived(selected.args, evnt);
        }
      } else if (operArrow && keyboardConfig.isArrow) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          evnt.preventDefault();
          this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          evnt.preventDefault();
          this.moveTabSelected(selected.args, evnt);
        } else if (actived.row || actived.column) {
          evnt.preventDefault();
          this.moveTabSelected(actived.args, evnt);
        }
      } else if (isDel || isBack) {
        // 如果是删除键
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          _tools.UtilTools.setCellValue(selected.row, selected.column, null);

          if (isBack) {
            this.handleActived(selected.args, evnt);
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
        // 如果开启复制功能
        if (isX || isC) {
          this.handleCopyed(isX, evnt);
        } else {// this.handlePaste(evnt)
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.column && selected.row && selected.column.editRender) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            _tools.UtilTools.setCellValue(selected.row, selected.column, null);

            this.handleActived(selected.args, evnt);
          }
        }
      }
    },
    // 处理 Tab 键移动
    moveTabSelected: function moveTabSelected(args, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editConfig = this.editConfig;
      var nextRow;
      var nextRowIndex;
      var nextColumn;
      var nextColumnIndex;
      var params = Object.assign({}, args);
      var rowIndex = tableData.indexOf(params.row);
      var columnIndex = visibleColumn.indexOf(params.column);

      for (var index = columnIndex + 1; index < visibleColumn.length; index++) {
        if (visibleColumn[index].editRender) {
          nextColumnIndex = index;
          nextColumn = visibleColumn[index];
          break;
        }
      }

      if (!nextColumn && rowIndex < tableData.length - 1) {
        // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        nextRowIndex = rowIndex + 1;
        nextRow = tableData[nextRowIndex];

        for (var _index = 0; _index < visibleColumn.length; _index++) {
          if (visibleColumn[_index].editRender) {
            nextColumnIndex = _index;
            nextColumn = visibleColumn[_index];
            break;
          }
        }
      }

      if (nextColumn) {
        if (nextRow) {
          params.rowIndex = nextRowIndex;
          params.row = nextRow;
        } else {
          params.rowIndex = rowIndex;
        }

        params.columnIndex = nextColumnIndex;
        params.column = nextColumn;
        params.cell = _tools.DomTools.getCell(this, params);

        if (editConfig) {
          if (editConfig.trigger === 'click') {
            this.handleActived(params, evnt);
          } else if (editConfig.trigger === 'dblclick') {
            this.handleSelected(params, evnt);
          }
        }
      }
    },
    // 处理方向键移动
    moveSelected: function moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          handleSelected = this.handleSelected;
      var params = Object.assign({}, args);

      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1;
        params.row = tableData[params.rowIndex];
      } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
        params.rowIndex += 1;
        params.row = tableData[params.rowIndex];
      } else if (isLeftArrow && params.columnIndex) {
        for (var len = params.columnIndex - 1; len >= 0; len--) {
          if (visibleColumn[len].editRender) {
            params.columnIndex = len;
            params.column = visibleColumn[len];
            break;
          }
        }
      } else if (isRightArrow && params.columnIndex) {
        for (var index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            params.columnIndex = index;
            params.column = visibleColumn[index];
            break;
          }
        }
      }

      params.cell = _tools.DomTools.getCell(this, params);
      handleSelected(params, evnt);
    },
    // 处理菜单的移动
    moveCtxMenu: function moveCtxMenu(evnt, keyCode, ctxMenuStore, key, operKey, operRest, menuList) {
      var selectIndex = _xeUtils.default.findIndexOf(menuList, function (item) {
        return ctxMenuStore[key] === item;
      });

      if (keyCode === operKey) {
        if (operRest && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true;
        } else {
          ctxMenuStore.showChild = false;
          ctxMenuStore.selectChild = null;
        }
      } else if (keyCode === 38) {
        ctxMenuStore[key] = menuList[selectIndex - 1] || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        ctxMenuStore[key] = menuList[selectIndex + 1] || menuList[0];
      } else if (ctxMenuStore[key] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[key]);
      }
    },
    handleGlobalResizeEvent: function handleGlobalResizeEvent() {
      this.recalculate();
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent: function handleGlobalContextmenuEvent(evnt) {
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore;

      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && this.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault();
            return;
          }
        } // 右键头部


        var headeWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper');

        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, 'header', {});
          return;
        } // 右键内容


        var bodyWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper');

        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, 'body', {});
          return;
        } // 右键表尾


        var footerWrapperNode = this.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper');

        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, 'footer', {});
          return;
        }
      }

      this.closeMenu();
      this.closeFilter();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu: function openContextMenu(evnt, type, params) {
      var _this11 = this;

      var tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuConfig = this.ctxMenuConfig,
          fullDataRowIdMap = this.fullDataRowIdMap,
          tableFullColumn = this.tableFullColumn;
      var config = ctxMenuConfig[type];

      if (config) {
        var options = config.options,
            visibleMethod = config.visibleMethod,
            disabled = config.disabled;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault();

            var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
                scrollTop = _DomTools$getDomNode.scrollTop,
                scrollLeft = _DomTools$getDomNode.scrollLeft,
                visibleHeight = _DomTools$getDomNode.visibleHeight,
                visibleWidth = _DomTools$getDomNode.visibleWidth;

            var _this$getEventTargetN = this.getEventTargetNode(evnt, this.$el, "vxe-".concat(type, "--column")),
                targetElem = _this$getEventTargetN.targetElem,
                flag = _this$getEventTargetN.flag;

            var args = {
              type: type,
              $table: this
            };

            if (flag) {
              var _DomTools$getCellInde = _tools.DomTools.getCellIndexs(targetElem),
                  rowId = _DomTools$getCellInde.rowId,
                  rowIndex = _DomTools$getCellInde.rowIndex,
                  colIndex = _DomTools$getCellInde.colIndex,
                  columnIndex = _DomTools$getCellInde.columnIndex;

              var column = colIndex ? tableFullColumn[colIndex] : visibleColumn[columnIndex];

              if (type === 'body') {
                var _ref2 = rowId ? fullDataRowIdMap.get(rowId) : tableData[rowIndex],
                    row = _ref2.row;

                args.row = row;
                args.rowIndex = rowIndex;
              }

              Object.assign(args, {
                column: column,
                columnIndex: columnIndex,
                cell: targetElem
              });
            }

            var top = evnt.clientY + scrollTop;
            var left = evnt.clientX + scrollLeft;
            Object.assign(ctxMenuStore, {
              args: args,
              visible: true,
              list: options,
              selected: null,
              selectChild: null,
              showChild: false,
              style: {
                top: "".concat(top, "px"),
                left: "".concat(left, "px")
              }
            });
            this.$nextTick(function () {
              var ctxElem = _this11.$refs.ctxWrapper.$el;
              var clientHeight = ctxElem.clientHeight;
              var clientWidth = ctxElem.clientWidth;
              var offsetTop = evnt.clientY + clientHeight - visibleHeight;
              var offsetLeft = evnt.clientX + clientWidth - visibleWidth;

              if (offsetTop > -10) {
                ctxMenuStore.style.top = "".concat(top - clientHeight, "px");
              }

              if (offsetLeft > -10) {
                ctxMenuStore.style.left = "".concat(left - clientWidth, "px");
              }
            });
          } else {
            this.closeMenu();
          }
        }
      }

      this.closeFilter();
    },

    /**
     * 关闭快捷菜单
     */
    closeMenu: function closeMenu() {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = _tools.UtilTools.hasChildrenList(item);
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;

      if (!item.children) {
        ctxMenuStore.selected = null;
      }

      ctxMenuStore.selectChild = null;
    },

    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent: function ctxMenuLinkEvent(evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        _tools.UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({
          menu: menu
        }, this.ctxMenuStore.args), evnt]);

        this.closeMenu();
      }
    },

    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent: function triggerHeaderTooltipEvent(evnt, _ref3) {
      var column = _ref3.column;
      var tooltipStore = this.tooltipStore;
      var own = column.own;

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, own.title || own.label, column);
      }
    },

    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent: function triggerTooltipEvent(evnt, params) {
      var editConfig = this.editConfig,
          editStore = this.editStore,
          tooltipStore = this.tooltipStore;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column;

      if (editConfig) {
        if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
          return;
        }
      }

      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.showTooltip(evnt, _tools.UtilTools.getCellLabel(row, column, params), column, row);
      }
    },
    // 显示 tooltip
    showTooltip: function showTooltip(evnt, content, column, row) {
      var cell = evnt.currentTarget;
      var tooltip = this.$refs.tooltip;
      var wrapperElem = cell.children[0];

      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        Object.assign(this.tooltipStore, {
          row: row,
          column: column,
          visible: true
        });

        if (tooltip) {
          tooltip.toVisible(cell, _tools.UtilTools.formatText(content));
        }
      }

      return this.$nextTick();
    },
    // 关闭 tooltip
    clostTooltip: function clostTooltip() {
      var tooltip = this.$refs.tooltip;
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false
      });

      if (tooltip) {
        tooltip.close();
      }

      return this.$nextTick();
    },

    /**
     * 处理默认勾选
     */
    handleDefaultRowChecked: function handleDefaultRowChecked() {
      var _this$selectConfig3 = this.selectConfig,
          selectConfig = _this$selectConfig3 === void 0 ? {} : _this$selectConfig3,
          tableFullData = this.tableFullData;
      var checkAll = selectConfig.checkAll,
          checkRowKeys = selectConfig.checkRowKeys;

      var rowKey = _tools.UtilTools.getRowKey(this);

      if (checkAll) {
        this.setAllSelection(true);
      } else if (checkRowKeys) {
        var property = rowKey;

        if (!property) {
          throw new Error('[vxe-table] Checked rows must have a unique primary key.');
        }

        this.setSelection(checkRowKeys.map(function (checkKey) {
          return tableFullData.find(function (item) {
            return checkKey === item[property];
          });
        }), true);
      }
    },
    setSelection: function setSelection(rows, value) {
      var _this12 = this;

      if (rows && !_xeUtils.default.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(function (row) {
        return _this12.triggerCheckRowEvent(null, {
          row: row
        }, !!value);
      });
      return this.$nextTick();
    },

    /**
     * 多选，行选中事件
     * value 选中true 不选false 不确定-1
     */
    triggerCheckRowEvent: function triggerCheckRowEvent(evnt, _ref4, value) {
      var row = _ref4.row;
      var selection = this.selection,
          tableFullData = this.tableFullData,
          _this$selectConfig4 = this.selectConfig,
          selectConfig = _this$selectConfig4 === void 0 ? {} : _this$selectConfig4,
          treeConfig = this.treeConfig,
          treeIndeterminates = this.treeIndeterminates;
      var property = selectConfig.checkField,
          checkMethod = selectConfig.checkMethod;

      if (!checkMethod || checkMethod({
        row: row,
        rowIndex: tableFullData.indexOf(row)
      })) {
        if (property) {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row);

              _xeUtils.default.set(row, property, false);
            } else {
              // 更新子节点状态
              _xeUtils.default.eachTree([row], function (item) {
                return _xeUtils.default.set(item, property, value);
              }, treeConfig);

              _xeUtils.default.remove(treeIndeterminates, function (item) {
                return item === row;
              });
            } // 如果存在父节点，更新父节点状态


            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (matchObj && matchObj.parent) {
              var selectItems = matchObj.items.filter(function (item) {
                return _xeUtils.default.get(item, property);
              });
              return this.triggerCheckRowEvent(evnt, {
                row: matchObj.parent
              }, selectItems.length === matchObj.items.length ? true : selectItems.length || value === -1 ? -1 : false);
            }
          } else {
            _xeUtils.default.set(row, property, value);
          }
        } else {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row);

              _xeUtils.default.remove(selection, function (item) {
                return item === row;
              });
            } else {
              // 更新子节点状态
              _xeUtils.default.eachTree([row], function (item) {
                if (value) {
                  if (selection.indexOf(item) === -1) {
                    selection.push(item);
                  }
                } else {
                  _xeUtils.default.remove(selection, function (select) {
                    return select === item;
                  });
                }
              }, treeConfig);

              _xeUtils.default.remove(treeIndeterminates, function (item) {
                return item === row;
              });
            } // 如果存在父节点，更新父节点状态


            var _matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return item === row;
            }, treeConfig);

            if (_matchObj && _matchObj.parent) {
              var _selectItems = _matchObj.items.filter(function (item) {
                return selection.indexOf(item) > -1;
              });

              return this.triggerCheckRowEvent(evnt, {
                row: _matchObj.parent
              }, _selectItems.length === _matchObj.items.length ? true : _selectItems.length || value === -1 ? -1 : false);
            }
          } else {
            if (value) {
              if (selection.indexOf(row) === -1) {
                selection.push(row);
              }
            } else {
              _xeUtils.default.remove(selection, function (item) {
                return item === row;
              });
            }
          }
        }

        this.checkSelectionStatus();

        _tools.UtilTools.emitEvent(this, 'select-change', [{
          row: row,
          selection: this.getSelectRecords(),
          checked: value
        }, evnt]);
      }
    },
    checkSelectionStatus: function checkSelectionStatus() {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig5 = this.selectConfig,
          selectConfig = _this$selectConfig5 === void 0 ? {} : _this$selectConfig5,
          selection = this.selection,
          treeIndeterminates = this.treeIndeterminates;
      var property = selectConfig.checkField,
          checkMethod = selectConfig.checkMethod;
      var insertList = editStore.insertList; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex
          }) || _xeUtils.default.get(row, property);
        } : function (row) {
          return _xeUtils.default.get(row, property);
        });
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
          return _xeUtils.default.get(row, property) || treeIndeterminates.indexOf(row) > -1;
        });
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? function (row, rowIndex) {
          return !checkMethod({
            row: row,
            rowIndex: rowIndex
          }) || selection.indexOf(row) > -1;
        } : function (row) {
          return selection.indexOf(row) > -1;
        });
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(function (row) {
          return treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1;
        });
      }
    },
    // 保留选中状态
    reserveCheckSelection: function reserveCheckSelection() {
      var _this$selectConfig6 = this.selectConfig,
          selectConfig = _this$selectConfig6 === void 0 ? {} : _this$selectConfig6,
          selection = this.selection,
          fullDataRowIdMap = this.fullDataRowIdMap;
      var reserve = selectConfig.reserve;

      var rowKey = _tools.UtilTools.getRowKey(this);

      if (reserve && selection.length) {
        this.selection = selection.map(function (row) {
          var rowId = '' + _xeUtils.default.get(row, rowKey);

          return fullDataRowIdMap.has(rowId) ? fullDataRowIdMap.get(rowId).row : row;
        });
      }
    },

    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection: function toggleRowSelection(row) {
      var _this$selectConfig7 = this.selectConfig,
          selectConfig = _this$selectConfig7 === void 0 ? {} : _this$selectConfig7,
          selection = this.selection;
      var property = selectConfig.checkField;
      this.triggerCheckRowEvent(arguments[1], {
        row: row
      }, property ? !_xeUtils.default.get(row, property) : selection.indexOf(row) === -1);
      return this.$nextTick();
    },
    setAllSelection: function setAllSelection(value) {
      var tableFullData = this.tableFullData,
          editStore = this.editStore,
          _this$selectConfig8 = this.selectConfig,
          selectConfig = _this$selectConfig8 === void 0 ? {} : _this$selectConfig8,
          treeConfig = this.treeConfig,
          selection = this.selection;
      var property = selectConfig.checkField,
          reserve = selectConfig.reserve,
          checkMethod = selectConfig.checkMethod;
      var insertList = editStore.insertList;
      var selectRows = []; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (property) {
        var updateValue = function updateValue(row, rowIndex) {
          if (!checkMethod || checkMethod({
            row: row,
            rowIndex: rowIndex
          })) {
            _xeUtils.default.set(row, property, value);
          }
        };

        if (treeConfig) {
          _xeUtils.default.eachTree(tableFullData, updateValue, treeConfig);
        } else {
          tableFullData.forEach(updateValue);
        }
      } else {
        if (value) {
          if (treeConfig) {
            _xeUtils.default.eachTree(tableFullData, function (row, rowIndex) {
              if (!checkMethod || checkMethod({
                row: row,
                rowIndex: rowIndex
              })) {
                selectRows.push(row);
              }
            }, treeConfig);
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter(function (row, rowIndex) {
                return checkMethod({
                  row: row,
                  rowIndex: rowIndex
                });
              });
            } else {
              selectRows = tableFullData.slice(0);
            }
          }
        }
      }

      this.selection = value && reserve ? selection.concat(selectRows.filter(function (row) {
        return selection.indexOf(row) === -1;
      })) : selectRows;
      this.isAllSelected = value;
      this.isIndeterminate = false;
      this.treeIndeterminates = [];
    },

    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent: function triggerCheckAllEvent(evnt, value) {
      this.setAllSelection(value);

      _tools.UtilTools.emitEvent(this, 'select-all', [{
        selection: this.getSelectRecords(),
        checked: value
      }, evnt]);
    },

    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection: function toggleAllSelection() {
      this.triggerCheckAllEvent(null, !this.isAllSelected);
      return this.$nextTick();
    },
    clearSelection: function clearSelection() {
      var tableFullData = this.tableFullData,
          _this$selectConfig9 = this.selectConfig,
          selectConfig = _this$selectConfig9 === void 0 ? {} : _this$selectConfig9,
          treeConfig = this.treeConfig;
      var property = selectConfig.checkField;

      if (property) {
        if (treeConfig) {
          _xeUtils.default.eachTree(tableFullData, function (item) {
            return _xeUtils.default.set(item, property, false);
          }, treeConfig);
        } else {
          tableFullData.forEach(function (item) {
            return _xeUtils.default.set(item, property, false);
          });
        }
      }

      this.isAllSelected = false;
      this.isIndeterminate = false;
      this.selection = [];
      this.treeIndeterminates = [];
      return this.$nextTick();
    },

    /**
     * 单选，行选中事件
     */
    triggerRowEvent: function triggerRowEvent(evnt, _ref5) {
      var row = _ref5.row;

      _tools.UtilTools.emitEvent(this, 'select-change', [{
        row: row
      }, evnt]);

      return this.setCurrentRow(row);
    },

    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow: function setCurrentRow(row) {
      var rowId = _tools.UtilTools.getRowId(this, row, this.getRowMapIndex(row));

      if (this.selectRow !== row) {
        this.clearCurrentRow();
      }

      this.clearCurrentColumn();
      this.selectRow = row;

      if (this.highlightCurrentRow) {
        _xeUtils.default.arrayEach(this.$el.querySelectorAll("[data-rowid=\"".concat(rowId, "\"]")), function (elem) {
          return _tools.DomTools.addClass(elem, 'row--current');
        });
      }

      return this.$nextTick();
    },
    clearCurrentRow: function clearCurrentRow() {
      this.selectRow = null;
      this.hoverRow = null;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.row--current'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'row--current');
      });

      return this.$nextTick();
    },
    getCurrentRow: function getCurrentRow() {
      return this.selectRow;
    },

    /**
     * 行 hover 事件
     */
    triggerHoverEvent: function triggerHoverEvent(evnt, _ref6) {
      var row = _ref6.row,
          rowIndex = _ref6.rowIndex;
      var $el = this.$el;

      var rowId = _tools.UtilTools.getRowId(this, row, rowIndex);

      this.clearHoverRow();

      _xeUtils.default.arrayEach($el.querySelectorAll("[data-rowid=\"".concat(rowId, "\"]")), function (elem) {
        return _tools.DomTools.addClass(elem, 'row--hover');
      });

      this.hoverRow = row;
    },
    clearHoverRow: function clearHoverRow() {
      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.row--hover'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'row--hover');
      });
    },

    /**
     * 表头按下事件
     */
    triggerHeaderCellMousedownEvent: function triggerHeaderCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          _this$mouseConfig3 = this.mouseConfig,
          mouseConfig = _this$mouseConfig3 === void 0 ? {} : _this$mouseConfig3,
          elemStore = this.elemStore,
          handleChecked = this.handleChecked,
          handleHeaderChecked = this.handleHeaderChecked,
          handleIndexChecked = this.handleIndexChecked;
      var button = evnt.button;
      var column = params.column,
          cell = params.cell;
      var isLeftBtn = button === 0;
      var isIndex = column.type === 'index';

      if (isLeftBtn && mouseConfig.checked) {
        var headerList = elemStore['main-header-list'].children;
        var bodyList = elemStore['main-body-list'].children;

        if (isIndex) {
          var firstTrElem = bodyList[0];
          var lastTrElem = bodyList[bodyList.length - 1];
          var firstCell = firstTrElem.querySelector(".".concat(column.id));
          this.clearSelected();
          handleHeaderChecked(_tools.DomTools.getRowNodes(headerList, _tools.DomTools.getCellNodeIndex(cell.nextElementSibling), _tools.DomTools.getCellNodeIndex(cell.parentNode.lastElementChild)));
          handleIndexChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell), _tools.DomTools.getCellNodeIndex(lastTrElem.querySelector(".".concat(column.id)))));
          handleChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell.nextElementSibling), _tools.DomTools.getCellNodeIndex(lastTrElem.lastElementChild)));
        } else {
          evnt.preventDefault();
          evnt.stopPropagation();
          this.clearSelected();
          this.clearHeaderChecked();
          this.clearIndexChecked();
          var domMousemove = document.onmousemove;
          var domMouseup = document.onmouseup;
          var startCell = bodyList[0].querySelector(".".concat(column.id));

          var updateEvent = _xeUtils.default.throttle(function (evnt) {
            evnt.preventDefault();

            var _DomTools$getEventTar = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-header--column'),
                flag = _DomTools$getEventTar.flag,
                targetElem = _DomTools$getEventTar.targetElem;

            if (!flag) {
              var a = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column');

              flag = a.flag;
              targetElem = a.targetElem;
            }

            if (flag && !_tools.DomTools.hasClass(targetElem, 'col--index')) {
              var colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem);
              var endCell = bodyList[bodyList.length - 1].children[colIndex];
              var head = headerList[0].children[colIndex];
              handleHeaderChecked(_tools.DomTools.getRowNodes(headerList, _tools.DomTools.getCellNodeIndex(head), _tools.DomTools.getCellNodeIndex(cell)));
              handleChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(startCell), _tools.DomTools.getCellNodeIndex(endCell)));
            }
          }, 80, {
            leading: true,
            trailing: true
          });

          _tools.DomTools.addClass($el, 'c--checked');

          document.onmousemove = updateEvent;

          document.onmouseup = function () {
            _tools.DomTools.removeClass($el, 'c--checked');

            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
          };

          handleHeaderChecked([[cell]]);

          if (bodyList.length) {
            var endCell = bodyList[bodyList.length - 1].querySelector(".".concat(column.id));
            this.handleChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(startCell), _tools.DomTools.getCellNodeIndex(endCell)));
          }
        }

        this.closeMenu();
      }
    },

    /**
     * 单元格按下事件
     */
    triggerCellMousedownEvent: function triggerCellMousedownEvent(evnt, params) {
      var $el = this.$el,
          tableData = this.tableData,
          visibleColumn = this.visibleColumn,
          editStore = this.editStore,
          editConfig = this.editConfig,
          handleSelected = this.handleSelected,
          _this$mouseConfig4 = this.mouseConfig,
          mouseConfig = _this$mouseConfig4 === void 0 ? {} : _this$mouseConfig4,
          handleChecked = this.handleChecked,
          handleIndexChecked = this.handleIndexChecked,
          handleHeaderChecked = this.handleHeaderChecked,
          elemStore = this.elemStore;
      var checked = editStore.checked,
          actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var button = evnt.button;
      var isLeftBtn = button === 0; // let isRightBtn = button === 2
      // if (isLeftBtn || isRightBtn) {
      // if (editConfig && editConfig.trigger === 'dblclick') {
      // 如果已经是激活状态

      if (!editConfig || editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {} else {
        if (isLeftBtn && mouseConfig.checked) {
          evnt.preventDefault();
          evnt.stopPropagation();
          this.clearHeaderChecked();
          this.clearIndexChecked();
          var domMousemove = document.onmousemove;
          var domMouseup = document.onmouseup; // let start = DomTools.getCellIndexs(cell)

          var startCellNode = _tools.DomTools.getCellNodeIndex(cell);

          var isIndex = column.type === 'index';
          var bodyList = elemStore['main-body-list'].children;
          var headerList = elemStore['main-header-list'].children;
          var cellLastElementChild = cell.parentNode.lastElementChild;
          var cellFirstElementChild = cell.parentNode.firstElementChild;
          var colIndex = [].indexOf.call(cell.parentNode.children, cell);
          var headStart = headerList[0].children[colIndex];

          var updateEvent = _xeUtils.default.throttle(function (evnt) {
            evnt.preventDefault();

            var _DomTools$getEventTar2 = _tools.DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column'),
                flag = _DomTools$getEventTar2.flag,
                targetElem = _DomTools$getEventTar2.targetElem;

            if (flag) {
              if (isIndex) {
                var firstCell = targetElem.parentNode.firstElementChild;
                handleChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell.nextElementSibling), _tools.DomTools.getCellNodeIndex(cellLastElementChild)));
                handleIndexChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell), _tools.DomTools.getCellNodeIndex(cell)));
              } else {
                var _firstCell = targetElem.parentNode.firstElementChild;

                var _colIndex = [].indexOf.call(targetElem.parentNode.children, targetElem);

                var head = headerList[0].children[_colIndex];
                handleHeaderChecked(_tools.DomTools.getRowNodes(headerList, _tools.DomTools.getCellNodeIndex(head), _tools.DomTools.getCellNodeIndex(headStart)));
                handleIndexChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(_firstCell), _tools.DomTools.getCellNodeIndex(cellFirstElementChild)));
                handleChecked(_tools.DomTools.getRowNodes(bodyList, startCellNode, _tools.DomTools.getCellNodeIndex(targetElem)));
              }
            }
          }, 80, {
            leading: true,
            trailing: true
          });

          document.onmousemove = updateEvent;

          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
          };

          if (isIndex) {
            var firstCell = cell.parentNode.firstElementChild;
            this.clearSelected();
            handleChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell.nextElementSibling), _tools.DomTools.getCellNodeIndex(cellLastElementChild)));
            handleIndexChecked(_tools.DomTools.getRowNodes(bodyList, _tools.DomTools.getCellNodeIndex(firstCell), _tools.DomTools.getCellNodeIndex(cell)));
          } else {
            this.handleSelected(params, evnt);
          }

          this.closeFilter();
          this.closeMenu();
        } else {
          // 如果不在所有选中的范围之内则重新选中
          var select = _tools.DomTools.getCellIndexs(cell);

          if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
            handleSelected(params, evnt);
          }
        }
      } // }
      // }

    },

    /**
     * 边角事件
     */
    // triggerCornerMousedownEvent (params, evnt) {
    //   evnt.preventDefault()
    //   evnt.stopPropagation()
    //   let { $el, tableData, visibleColumn, editStore, editConfig, handleTempChecked } = this
    //   let { checked } = editStore
    //   let { button } = evnt
    //   let isLeftBtn = button === 0
    //   let isRightBtn = button === 2
    //   if (isLeftBtn || isRightBtn) {
    //     if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
    //       let domMousemove = document.onmousemove
    //       let domMouseup = document.onmouseup
    //       let start = {
    //         rowIndex: tableData.indexOf(checked.rows[0]),
    //         columnIndex: visibleColumn.indexOf(checked.columns[0])
    //       }
    //       let updateEvent = XEUtils.throttle(function (evnt) {
    //         evnt.preventDefault()
    //         let { flag, targetElem } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column')
    //         if (flag) {
    //           handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt)
    //         }
    //       }, browse.msie ? 80 : 40, { leading: true, trailing: true })
    //       document.onmousemove = updateEvent
    //       document.onmouseup = function (evnt) {
    //         document.onmousemove = domMousemove
    //         document.onmouseup = domMouseup
    //         checked.rows = checked.tRows
    //         checked.columns = checked.tColumns
    //       }
    //     }
    //   }
    // },
    triggerHeaderCellClickEvent: function triggerHeaderCellClickEvent(evnt, params) {
      var column = params.column;

      _tools.UtilTools.emitEvent(this, 'header-cell-click', [params, evnt]);

      if (this.highlightCurrentColumn) {
        return this.setCurrentColumn(column, true);
      }

      return this.$nextTick();
    },
    setCurrentColumn: function setCurrentColumn(column) {
      this.clearCurrentRow();

      if (this.selectColumn !== column) {
        this.clearCurrentColumn();
      }

      this.selectColumn = column;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll(".".concat(column.id)), function (elem) {
        return _tools.DomTools.addClass(elem, 'col--current');
      });

      return this.$nextTick();
    },
    clearCurrentColumn: function clearCurrentColumn() {
      this.selectColumn = null;

      _xeUtils.default.arrayEach(this.$el.querySelectorAll('.col--current'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--current');
      });

      return this.$nextTick();
    },

    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent: function triggerCellClickEvent(evnt, params) {
      var _this13 = this;

      var $el = this.$el,
          highlightCurrentRow = this.highlightCurrentRow,
          editStore = this.editStore,
          selectConfig = this.selectConfig,
          treeConfig = this.treeConfig,
          editConfig = this.editConfig;
      var actived = editStore.actived;
      var column = params.column,
          columnIndex = params.columnIndex;

      if (highlightCurrentRow) {
        if (!this.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag && !this.getEventTargetNode(evnt, $el, 'vxe-checkbox').flag) {
          this.setCurrentRow(params.row);
        }
      } // 如果是多选


      if (selectConfig && (selectConfig.trigger === 'row' || column.type === 'selection' && selectConfig.trigger === 'cell') && !this.getEventTargetNode(evnt, params.cell, 'vxe-checkbox').flag) {
        this.toggleRowSelection(params.row, evnt);
      } // 如果是树形表格


      if (treeConfig && (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell')) {
        this.triggerTreeExpandEvent(evnt, params);
      }

      if (editConfig) {
        if (editConfig.trigger === 'click') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editConfig.mode === 'row') {
              this.triggerValidate('blur').catch(function (e) {
                return e;
              }).then(function () {
                _this13.handleActived(params, evnt).then(function () {
                  return _this13.triggerValidate('change');
                }).catch(function (e) {
                  return e;
                });
              });
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt).then(function () {
                return _this13.triggerValidate('change');
              }).catch(function (e) {
                return e;
              });
            }
          }
        } else {
          if (actived.row) {
            column.model.update = false;
            column.model.value = _tools.UtilTools.getCellValue(actived.row, column);
            actived.column = actived.args.column = column;
            actived.columnIndex = actived.args.columnIndex = columnIndex;
          }
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
    },

    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent: function triggerCellDBLClickEvent(evnt, params) {
      var editStore = this.editStore,
          editConfig = this.editConfig;
      var actived = editStore.actived;

      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            this.handleActived(params, evnt);
          }
        }
      }

      _tools.UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
    },

    /**
     * 处理激活编辑
     */
    handleActived: function handleActived(params, evnt) {
      var _this14 = this;

      var editStore = this.editStore,
          editConfig = this.editConfig,
          tableColumn = this.tableColumn;
      var activeMethod = editConfig.activeMethod;
      var actived = editStore.actived;
      var row = params.row,
          column = params.column,
          cell = params.cell;
      var model = column.model,
          editRender = column.editRender;

      if (editRender) {
        var isRowMode = editConfig.mode === 'row';

        if (isRowMode ? actived.row !== row : actived.row !== row || actived.column !== column) {
          // 判断是否禁用编辑
          var type = 'edit-disabled';

          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip();
            this.clearCopyed(evnt);
            this.clearChecked();
            this.clearSelected(evnt);
            this.clearActived(evnt);
            type = 'edit-actived';
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;

            if (isRowMode) {
              tableColumn.forEach(function (column) {
                if (column.editRender) {
                  column.model.value = _tools.UtilTools.getCellValue(row, column);
                  column.model.update = false;
                }
              });
            } else {
              model.value = _tools.UtilTools.getCellValue(row, column);
              model.update = false;
            }

            this.$nextTick(function () {
              _this14.handleFocus(params, evnt);
            });
          }

          _tools.UtilTools.emitEvent(this, type, [params, evnt]);
        } else {
          var oldColumn = actived.column;

          if (oldColumn !== column) {
            var oldModel = oldColumn.model;

            if (oldModel.update) {
              _tools.UtilTools.setCellValue(row, oldColumn, oldModel.value);
            }

            this.clearValidate();
          }

          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          actived.column = column;
          setTimeout(function () {
            _this14.handleFocus(params, evnt);
          });
        }
      }

      return this.$nextTick();
    },

    /**
     * 清除激活的编辑
     */
    clearActived: function clearActived(evnt) {
      var editStore = this.editStore;
      var actived = editStore.actived;
      var args = actived.args,
          row = actived.row,
          column = actived.column;

      if (row || column) {
        var model = column.model;

        if (model.update) {
          _tools.UtilTools.setCellValue(row, column, model.value);

          model.update = false;
          model.value = null;
        }

        _tools.UtilTools.emitEvent(this, 'edit-closed', [args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return this.clearValidate().then(this.recalculate);
    },
    getActiveRow: function getActiveRow() {
      var $el = this.$el,
          editStore = this.editStore,
          tableData = this.tableData;
      var _editStore$actived = editStore.actived,
          args = _editStore$actived.args,
          row = _editStore$actived.row;

      if (args && tableData.indexOf(row) > -1 && $el.querySelectorAll('.vxe-body--column.col--actived').length) {
        return Object.assign({}, args);
      }

      return null;
    },
    hasActiveRow: function hasActiveRow(row) {
      return this.editStore.actived.row === row;
    },

    /**
     * 清除所选中源状态
     */
    clearSelected: function clearSelected(evnt) {
      var editStore = this.editStore,
          elemStore = this.elemStore;
      var selected = editStore.selected;
      selected.row = null;
      selected.column = null;
      var headerElem = elemStore['main-header-list'];
      var bodyElem = elemStore['main-body-list'];

      _xeUtils.default.arrayEach(headerElem.querySelectorAll('.col--title-selected'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--title-selected');
      });

      _xeUtils.default.arrayEach([bodyElem.querySelector('.col--selected')], function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--selected');
      });

      return this.$nextTick();
    },

    /**
     * 处理选中源
     */
    handleSelected: function handleSelected(params, evnt) {
      var _this15 = this;

      var _this$mouseConfig5 = this.mouseConfig,
          mouseConfig = _this$mouseConfig5 === void 0 ? {} : _this$mouseConfig5,
          editStore = this.editStore,
          elemStore = this.elemStore;
      var selected = editStore.selected;
      var row = params.row,
          column = params.column,
          cell = params.cell;

      var selectMethod = function selectMethod() {
        if (selected.row !== row || selected.column !== column) {
          _this15.clearChecked(evnt);

          _this15.clearIndexChecked();

          _this15.clearHeaderChecked();

          _this15.clearSelected();

          _this15.clearActived(evnt);

          selected.args = params;
          selected.row = row;
          selected.column = column;
          var listElem = elemStore['main-body-list'];

          var rowId = _tools.UtilTools.getRowId(_this15, row, _this15.getRowMapIndex(row));

          var trElem = listElem.querySelector("[data-rowid=\"".concat(rowId, "\"]"));
          var tdElem = trElem.querySelector(".".concat(column.id));

          _tools.DomTools.addClass(tdElem, 'col--selected');
        } // 如果配置了批量选中功能，则为批量选中状态


        if (mouseConfig.checked) {
          var headerElem = elemStore['main-header-list'];

          _this15.handleHeaderChecked([[headerElem.querySelector(".".concat(column.id))]]);

          _this15.handleIndexChecked([[cell.parentNode.querySelector('.col--index')]]);
        }

        return _this15.$nextTick();
      };

      return selectMethod();
    },

    /**
     * 清除所有选中状态
     */
    clearChecked: function clearChecked(evnt) {
      var editStore = this.editStore,
          elemStore = this.elemStore;
      var checked = editStore.checked;
      var bodyElem = elemStore['main-body-list'];
      checked.rows = [];
      checked.columns = [];
      checked.tRows = [];
      checked.tColumns = [];

      _xeUtils.default.arrayEach(bodyElem.querySelectorAll('.col--checked'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--checked');
      });

      return this.$nextTick();
    },

    /**
     * 处理所有选中
     */
    handleChecked: function handleChecked(rowNodes) {
      var checked = this.editStore.checked;
      this.clearChecked();
      rowNodes.forEach(function (rows, rowIndex) {
        var isTop = rowIndex === 0;
        var isBottom = rowIndex === rowNodes.length - 1;
        rows.forEach(function (elem, colIndex) {
          var isLeft = colIndex === 0;
          var isRight = colIndex === rows.length - 1;

          _tools.DomTools.addClass(elem, 'col--checked');

          if (isTop) {
            _tools.DomTools.addClass(elem, 'col--checked-top');
          }

          if (isBottom) {
            _tools.DomTools.addClass(elem, 'col--checked-bottom');
          }

          if (isLeft) {
            _tools.DomTools.addClass(elem, 'col--checked-left');
          }

          if (isRight) {
            _tools.DomTools.addClass(elem, 'col--checked-right');
          }
        });
      });
      checked.rowNodes = rowNodes;
    },
    handleIndexChecked: function handleIndexChecked(rowNodes) {
      var indexs = this.editStore.indexs;
      this.clearIndexChecked();
      rowNodes.forEach(function (rows) {
        rows.forEach(function (elem) {
          _tools.DomTools.addClass(elem, 'col--index-checked');
        });
      });
      indexs.rowNodes = rowNodes;
    },
    clearIndexChecked: function clearIndexChecked() {
      var elemStore = this.elemStore;
      var bodyElem = elemStore['main-body-list'];

      _xeUtils.default.arrayEach(bodyElem.querySelectorAll('.col--index-checked'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--index-checked');
      });

      return this.$nextTick();
    },
    handleHeaderChecked: function handleHeaderChecked(rowNodes) {
      var titles = this.editStore.titles;
      this.clearHeaderChecked();
      rowNodes.forEach(function (rows) {
        rows.forEach(function (elem) {
          _tools.DomTools.addClass(elem, 'col--title-checked');
        });
      });
      titles.rowNodes = rowNodes;
    },
    clearHeaderChecked: function clearHeaderChecked() {
      var elemStore = this.elemStore;
      var headerElem = elemStore['main-header-list'];

      _xeUtils.default.arrayEach(headerElem.querySelectorAll('.col--title-checked'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--title-checked');
      });

      return this.$nextTick();
    },

    /**
     * 处理所有选中的临时选中
     */
    // handleTempChecked (start, end, evnt) {
    //   let { tableData, visibleColumn, editStore } = this
    //   let { checked } = editStore
    //   let { rows, tRows, columns, tColumns } = checked
    //   let { rowIndex: sRowIndex, columnIndex: sColumnIndex } = start
    //   let { rowIndex: eRowIndex, columnIndex: eColumnIndex } = end
    //   if (tRows.length > rows.length) {
    //     eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1])
    //   } else if (tColumns.length > columns.length) {
    //     eRowIndex = tableData.indexOf(rows[rows.length - 1])
    //   }
    //   if (sRowIndex < eRowIndex) {
    //     // 向下
    //     checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1)
    //   } else {
    //     // 向上
    //     sRowIndex += rows.length
    //     checked.tRows = tableData.slice(eRowIndex, sRowIndex)
    //   }
    //   if (sColumnIndex < eColumnIndex) {
    //     // 向右
    //     checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1)
    //   } else {
    //     // 向左
    //     sColumnIndex += columns.length
    //     checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex)
    //   }
    // },

    /**
     * 清空已复制的内容
     */
    clearCopyed: function clearCopyed() {
      var editStore = this.editStore,
          elemStore = this.elemStore;
      var copyed = editStore.copyed;
      var bodyElem = elemStore['main-body-list'];
      copyed.cut = false;
      copyed.rows = [];
      copyed.columns = [];

      _xeUtils.default.arrayEach(bodyElem.querySelectorAll('.col--copyed'), function (elem) {
        return _tools.DomTools.removeClass(elem, 'col--copyed');
      });

      return this.$nextTick();
    },

    /**
     * 处理复制
     */
    handleCopyed: function handleCopyed(cut, evnt) {
      var editStore = this.editStore;
      var copyed = editStore.copyed,
          checked = editStore.checked;
      var rowNodes = checked.rowNodes;
      this.clearCopyed();
      rowNodes.forEach(function (rows, rowIndex) {
        var isTop = rowIndex === 0;
        var isBottom = rowIndex === rowNodes.length - 1;
        rows.forEach(function (elem, colIndex) {
          var isLeft = colIndex === 0;
          var isRight = colIndex === rows.length - 1;

          _tools.DomTools.addClass(elem, 'col--copyed');

          if (isTop) {
            _tools.DomTools.addClass(elem, 'col--copyed-top');
          }

          if (isBottom) {
            _tools.DomTools.addClass(elem, 'col--copyed-bottom');
          }

          if (isLeft) {
            _tools.DomTools.addClass(elem, 'col--copyed-left');
          }

          if (isRight) {
            _tools.DomTools.addClass(elem, 'col--copyed-right');
          }
        });
      });
      copyed.cut = cut;
      copyed.rows = checked.rows;
      copyed.columns = checked.columns;
      copyed.rowNodes = rowNodes;
    },

    /**
     * 处理粘贴
     */
    // handlePaste (evnt) {
    //   let { tableData, visibleColumn, editStore } = this
    //   let { copyed, selected } = editStore
    //   let { cut, rows, columns } = copyed
    //   if (rows.length && columns.length && selected.row && selected.column) {
    //     let { rowIndex, columnIndex } = selected.args
    //     // let start = { rowIndex, columnIndex }
    //     // let end = {
    //     //   rowIndex: rowIndex + rows.length - 1,
    //     //   columnIndex: columnIndex + columns.length - 1
    //     // }
    //     rows.forEach((row, rIndex) => {
    //       let offsetRow = tableData[rowIndex + rIndex]
    //       if (offsetRow) {
    //         columns.forEach((column, cIndex) => {
    //           let offsetColumn = visibleColumn[columnIndex + cIndex]
    //           if (offsetColumn) {
    //             UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column))
    //           }
    //           if (cut) {
    //             UtilTools.setCellValue(row, column, null)
    //           }
    //         })
    //       }
    //     })
    //     if (cut) {
    //       this.clearCopyed()
    //     }
    //     // this.handleOldChecked(start, end, evnt)
    //   }
    // },

    /**
     * 处理聚焦
     */
    handleFocus: function handleFocus(params, evnt) {
      var column = params.column,
          cell = params.cell;
      var editRender = column.editRender;

      if (editRender) {
        var compRender = _vXETable.Renderer.get(editRender.name);

        var autofocus = editRender.autofocus,
            autoselect = editRender.autoselect;
        var inputElem; // 如果指定了聚焦 class

        if (autofocus) {
          inputElem = cell.querySelector(autofocus);
        } // 渲染器的聚焦处理


        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus);
        }

        if (inputElem) {
          inputElem[autoselect ? 'select' : 'focus']();
        }
      }
    },

    /**
     * 激活行编辑
     */
    setActiveRow: function setActiveRow(row) {
      return this.setActiveCell(row, this.visibleColumn.find(function (column) {
        return column.editRender;
      }).property);
    },

    /**
     * 激活单元格编辑
     */
    setActiveCell: function setActiveCell(row, field) {
      var _this16 = this;

      return new Promise(function (resolve) {
        setTimeout(function () {
          var tableData = _this16.tableData,
              visibleColumn = _this16.visibleColumn,
              handleActived = _this16.handleActived;

          if (row && field) {
            var rowIndex = tableData.indexOf(row);

            if (rowIndex > -1) {
              var column = visibleColumn.find(function (column) {
                return column.property === field;
              });

              var cell = _tools.DomTools.getCell(_this16, {
                row: row,
                rowIndex: rowIndex,
                column: column
              });

              handleActived({
                row: row,
                column: column,
                cell: cell
              });
              _this16.lastCallTime = Date.now();
            }
          }

          resolve(_this16.$nextTick());
        });
      });
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell: function setSelectCell(row, field) {
      var tableData = this.tableData,
          editConfig = this.editConfig,
          visibleColumn = this.visibleColumn;

      if (row && field && editConfig.trigger !== 'manual') {
        var column = visibleColumn.find(function (column) {
          return column.property === field;
        });
        var rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          var cell = _tools.DomTools.getCell(this, {
            row: row,
            rowIndex: rowIndex,
            column: column
          });

          var params = {
            row: row,
            rowIndex: rowIndex,
            column: column,
            columnIndex: visibleColumn.indexOf(column),
            cell: cell
          };
          this.handleSelected(params, {});
        }
      }

      return this.$nextTick();
    },

    /**
     * 点击排序事件
     */
    triggerSortEvent: function triggerSortEvent(evnt, column, params, order) {
      this.sort(column.property, order);
    },
    sort: function sort(field, order) {
      var visibleColumn = this.visibleColumn,
          tableFullColumn = this.tableFullColumn,
          remoteSort = this.remoteSort;
      var column = visibleColumn.find(function (item) {
        return item.property === field;
      });
      var isRemote = _xeUtils.default.isBoolean(column.remoteSort) ? column.remoteSort : remoteSort;

      if (order && column.order !== order) {
        tableFullColumn.forEach(function (column) {
          column.order = null;
        });
        column.order = order; // 如果是服务端排序，则跳过本地排序处理

        if (!isRemote) {
          this.tableData = this.getTableData(true).tableData;
        }

        _tools.UtilTools.emitEvent(this, 'sort-change', [{
          column: column,
          prop: field,
          field: field,
          order: order
        }]);
      }

      return this.$nextTick().then(this.updateStyle);
    },
    clearSort: function clearSort() {
      this.tableFullColumn.forEach(function (column) {
        column.order = null;
      });
      this.tableFullData = this.data || [];
      this.tableData = this.getTableData(true).tableData;
      return this.$nextTick();
    },

    /**
     * 点击筛选事件
     */
    triggerFilterEvent: function triggerFilterEvent(evnt, column, params) {
      var $refs = this.$refs,
          filterStore = this.filterStore,
          overflowX = this.overflowX;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        var targetElem = evnt.target;
        var bodyElem = $refs.tableBody.$el;
        var filterWrapper = $refs.filterWrapper;

        var _DomTools$getOffsetPo = _tools.DomTools.getOffsetPos(targetElem),
            top = _DomTools$getOffsetPo.top,
            left = _DomTools$getOffsetPo.left;

        if (overflowX) {
          left -= bodyElem.scrollLeft;
        }

        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: {
            zIndex: _conf.default.tooltip.zIndex,
            top: "".concat(top + targetElem.clientHeight + 6, "px"),
            left: "".concat(left, "px")
          },
          visible: true
        });
        filterStore.isAllSelected = filterStore.options.every(function (item) {
          return item.checked;
        });
        filterStore.isIndeterminate = !this.isAllSelected && filterStore.options.some(function (item) {
          return item.checked;
        });
        this.$nextTick(function () {
          var filterWrapperElem = filterWrapper.$el;
          filterStore.style.top = "".concat(top + targetElem.clientHeight + 6, "px");
          filterStore.style.left = "".concat(left - filterWrapperElem.clientWidth / 2 + 10, "px");
        });
      }
    },
    // 确认筛选
    confirmFilterEvent: function confirmFilterEvent(evnt) {
      var visibleColumn = this.visibleColumn,
          filterStore = this.filterStore,
          remoteFilter = this.remoteFilter,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad;
      var column = filterStore.column;
      var values = [];
      column.filters.forEach(function (item) {
        if (item.checked) {
          values.push(item.value);
        }
      });
      filterStore.visible = false; // 如果是服务端筛选，则跳过本地筛选处理

      if (!remoteFilter) {
        this.tableData = this.getTableData(true).tableData;
      }

      var filterList = [];
      visibleColumn.filter(function (column) {
        var property = column.property,
            filters = column.filters;
        var valueList = [];

        if (filters && filters.length) {
          filters.forEach(function (item) {
            if (item.checked) {
              valueList.push(item.value);
            }
          });
          filterList.push({
            column: column,
            field: property,
            prop: property,
            values: valueList
          });
        }
      });

      _tools.UtilTools.emitEvent(this, 'filter-change', [{
        column: column,
        field: column.property,
        prop: column.property,
        values: values,
        filters: filterList
      }]);

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();
      }

      this.closeFilter();
      this.$nextTick(this.recalculate);
    },
    // 关闭筛选
    closeFilter: function closeFilter(evnt) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        options: [],
        visible: false
      });
      return this.$nextTick();
    },
    // 重置筛选
    resetFilterEvent: function resetFilterEvent(evnt) {
      this.filterStore.options.forEach(function (item) {
        item.checked = false;
        item.data = item._data;
      });
      this.confirmFilterEvent(evnt);
    },
    clearFilter: function clearFilter(force) {
      var visibleColumn = this.visibleColumn;
      visibleColumn.forEach(function (column) {
        var filters = column.filters;

        if (filters && filters.length) {
          filters.forEach(function (item) {
            item.checked = false;
          });
        }
      });
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      });
      this.tableData = this.getTableData(true).tableData;
      return this.$nextTick();
    },

    /**
     * 展开行事件
     */
    triggerRowExpandEvent: function triggerRowExpandEvent(evnt, _ref7) {
      var row = _ref7.row;
      var rest = this.toggleRowExpansion(row);

      _tools.UtilTools.emitEvent(this, 'toggle-expand-change', [{
        row: row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);

      return rest;
    },

    /**
     * 切换展开行
     */
    toggleRowExpansion: function toggleRowExpansion(row) {
      return this.setRowExpansion(row);
    },

    /**
     * 处理默认展开行
     */
    handleDefaultRowExpand: function handleDefaultRowExpand() {
      var _this$expandConfig = this.expandConfig,
          expandConfig = _this$expandConfig === void 0 ? {} : _this$expandConfig,
          tableFullData = this.tableFullData;
      var expandAll = expandConfig.expandAll,
          expandRowKeys = expandConfig.expandRowKeys;

      var rowKey = _tools.UtilTools.getRowKey(this);

      if (expandAll) {
        this.expandeds = tableFullData.slice(0);
      } else if (expandRowKeys) {
        var property = rowKey;

        if (!property) {
          throw new Error('[vxe-table] Expand rows must have a unique primary key.');
        }

        this.expandeds = expandRowKeys.map(function (expandKey) {
          return tableFullData.find(function (item) {
            return expandKey === item[property];
          });
        });
      }
    },
    setAllRowExpansion: function setAllRowExpansion(expanded) {
      this.expandeds = expanded ? this.tableFullData.slice(0) : [];
      return this.$nextTick();
    },

    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setRowExpansion: function setRowExpansion(rows, expanded) {
      var expandeds = this.expandeds,
          _this$expandConfig2 = this.expandConfig,
          expandConfig = _this$expandConfig2 === void 0 ? {} : _this$expandConfig2;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (expandConfig.accordion) {
          // 只能同时展开一个
          expandeds.length = 0;
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var index = expandeds.indexOf(row);

          if (index > -1) {
            if (isToggle || !expanded) {
              expandeds.splice(index, 1);
            }
          } else {
            if (isToggle || expanded) {
              expandeds.push(row);
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasRowExpand: function hasRowExpand(row) {
      return this.expandeds.indexOf(row) > -1;
    },
    clearRowExpand: function clearRowExpand() {
      this.expandeds = [];
      return this.$nextTick();
    },

    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent: function triggerTreeExpandEvent(evnt, _ref8) {
      var _this17 = this;

      var row = _ref8.row;
      var selectColumn = this.selectColumn;
      var rest = this.toggleTreeExpansion(row);

      _tools.UtilTools.emitEvent(this, 'toggle-tree-change', [{
        row: row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);

      if (selectColumn) {
        this.$nextTick(function () {
          return _this17.setCurrentColumn(selectColumn);
        });
      }

      return rest;
    },

    /**
     * 切换/展开树节点
     */
    toggleTreeExpansion: function toggleTreeExpansion(row) {
      return this.setTreeExpansion(row);
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand: function handleDefaultTreeExpand() {
      var rowKey = this.rowKey,
          treeConfig = this.treeConfig,
          tableFullData = this.tableFullData;

      if (treeConfig) {
        var key = treeConfig.key,
            expandAll = treeConfig.expandAll,
            expandRowKeys = treeConfig.expandRowKeys;
        var children = treeConfig.children;
        var property = rowKey || key;
        var treeExpandeds = [];

        if (expandAll) {
          _xeUtils.default.filterTree(tableFullData, function (row) {
            var rowChildren = row[children];

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(row);
            }
          }, treeConfig);

          this.treeExpandeds = treeExpandeds;
        } else if (expandRowKeys) {
          expandRowKeys.forEach(function (rowKey) {
            var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
              return rowKey === item[property];
            }, treeConfig);

            var rowChildren = matchObj ? matchObj.item[children] : 0;

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(matchObj.item);
            }
          });
          this.treeExpandeds = treeExpandeds;
        }
      }
    },
    setAllTreeExpansion: function setAllTreeExpansion(expanded) {
      var tableFullData = this.tableFullData,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var treeExpandeds = [];

      if (expanded) {
        _xeUtils.default.eachTree(tableFullData, function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeConfig);
      }

      this.treeExpandeds = treeExpandeds;
      return this.$nextTick();
    },

    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setTreeExpansion: function setTreeExpansion(rows, expanded) {
      var tableFullData = this.tableFullData,
          treeExpandeds = this.treeExpandeds,
          treeConfig = this.treeConfig;
      var children = treeConfig.children;
      var isToggle = arguments.length === 1;

      if (rows) {
        if (!_xeUtils.default.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig.accordion) {
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(function (row) {
          var rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            var index = treeExpandeds.indexOf(row);

            if (treeConfig.accordion) {
              // 同一级只能展开一个
              var matchObj = _xeUtils.default.findTree(tableFullData, function (item) {
                return item === row;
              }, treeConfig);

              _xeUtils.default.remove(treeExpandeds, function (item) {
                return matchObj.items.indexOf(item) > -1;
              });
            }

            if (index > -1) {
              if (isToggle || !expanded) {
                treeExpandeds.splice(index, 1);
              }
            } else {
              if (isToggle || expanded) {
                treeExpandeds.push(row);
              }
            }
          }
        });
      }

      return this.$nextTick();
    },
    hasTreeExpand: function hasTreeExpand(row) {
      return this.treeExpandeds.indexOf(row) > -1;
    },
    clearTreeExpand: function clearTreeExpand() {
      this.treeExpandeds = [];
      return this.$nextTick();
    },

    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad: function isScrollXLoad() {
      return this.scrollXLoad;
    },

    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad: function isScrollYLoad() {
      return this.scrollYLoad;
    },

    /**
     * 横向 X 可视渲染事件处理
     */
    triggerScrollXEvent: function triggerScrollXEvent(evnt) {
      var _this18 = this;

      var $refs = this.$refs,
          visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore;
      var startIndex = scrollXStore.startIndex,
          renderSize = scrollXStore.renderSize,
          offsetSize = scrollXStore.offsetSize,
          visibleSize = scrollXStore.visibleSize;
      var scrollBodyElem = $refs.tableBody.$el;
      var scrollLeft = scrollBodyElem.scrollLeft;
      var toVisibleIndex = 0;
      var width = 0;

      for (var index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth;

        if (scrollLeft < width) {
          toVisibleIndex = index;
          break;
        }
      }

      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        var isReload;
        var preloadSize = 0;
        var isLeft = scrollXStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        var isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        var residueSize = renderSize - visibleSize;

        if (isLeft) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollXStore.visibleIndex = toVisibleIndex;
          scrollXStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), visibleColumn.length - renderSize);
          this.updateScrollXSpace();
          this.$nextTick(function () {
            // scrollBodyElem.scrollLeft = scrollLeft
            _this18.updateStyle();
          });
        }
      }

      this.clostTooltip();
    },

    /**
     * 纵向 Y 可视渲染事件处理
     */
    triggerScrollYEvent: function triggerScrollYEvent(evnt) {
      var scrollYStore = this.scrollYStore; // webkit 浏览器使用最佳的渲染方式

      if (isWebkit && scrollYStore.adaptive) {
        this.loadScrollYData(evnt);
      } else {
        this.debounceScrollY(evnt);
      }
    },
    debounceScrollY: _xeUtils.default.debounce(function (evnt) {
      this.loadScrollYData(evnt);
    }, debounceScrollYDuration, {
      leading: false,
      trailing: true
    }),

    /**
     * 纵向 Y 可视渲染处理
     */
    loadScrollYData: function loadScrollYData(evnt) {
      var _this19 = this;

      var tableFullData = this.tableFullData,
          scrollYStore = this.scrollYStore;
      var startIndex = scrollYStore.startIndex,
          renderSize = scrollYStore.renderSize,
          offsetSize = scrollYStore.offsetSize,
          visibleSize = scrollYStore.visibleSize,
          rowHeight = scrollYStore.rowHeight;
      var scrollBodyElem = evnt.target;
      var scrollTop = scrollBodyElem.scrollTop;
      var toVisibleIndex = Math.ceil(scrollTop / rowHeight);

      if (scrollYStore.visibleIndex !== toVisibleIndex) {
        var isReload;
        var preloadSize = 0;
        var isTop = scrollYStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        var isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        var residueSize = renderSize - visibleSize;

        if (isTop) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollYStore.visibleIndex = toVisibleIndex;
          scrollYStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), tableFullData.length - renderSize);
          this.updateScrollYSpace();
          this.$nextTick(function () {
            // scrollBodyElem.scrollTop = scrollTop
            _this19.updateStyle();
          });
        }
      }
    },
    // 计算可视渲染相关数据
    computeScrollLoad: function computeScrollLoad() {
      var scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore,
          scrollXStore = this.scrollXStore,
          visibleColumn = this.visibleColumn,
          optimizeOpts = this.optimizeOpts;
      var scrollX = optimizeOpts.scrollX,
          scrollY = optimizeOpts.scrollY;
      var tableBody = this.$refs.tableBody;
      var tableBodyElem = tableBody ? tableBody.$el : null;
      var tableHeader = this.$refs.tableHeader;

      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
          // 无法预知，默认取前 10 条平均宽度进行运算
          var visibleSize = scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / (visibleColumn.slice(0, 10).reduce(function (previous, column) {
            return previous + column.renderWidth;
          }, 0) / 10));
          scrollXStore.visibleSize = visibleSize;

          if (scrollXStore.adaptive) {
            scrollXStore.offsetSize = visibleSize;
            scrollXStore.renderSize = visibleSize + 2;
          }

          this.updateScrollXSpace();
        } // 计算 Y 逻辑


        if (scrollYLoad) {
          if (scrollY.rHeight) {
            scrollYStore.rowHeight = scrollY.rHeight;
          } else {
            var firstTrElem = tableBodyElem.querySelector('tbody>tr');

            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr');
            }

            if (firstTrElem) {
              scrollYStore.rowHeight = firstTrElem.clientHeight;
            }
          }

          var _visibleSize = scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / scrollYStore.rowHeight);

          scrollYStore.visibleSize = _visibleSize;

          if (isWebkit && scrollYStore.adaptive) {
            scrollYStore.offsetSize = _visibleSize;
            scrollYStore.renderSize = _visibleSize + 2;
          }

          this.updateScrollYSpace();
        }
      }

      this.$nextTick(this.updateStyle);
    },
    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace: function updateScrollXSpace() {
      var $refs = this.$refs,
          elemStore = this.elemStore,
          visibleColumn = this.visibleColumn,
          scrollXStore = this.scrollXStore,
          tableWidth = this.tableWidth,
          scrollYWidth = this.scrollYWidth;
      var tableHeader = $refs.tableHeader,
          tableBody = $refs.tableBody,
          tableFooter = $refs.tableFooter;
      var headerElem = tableHeader ? tableHeader.$el.querySelector('.vxe-table--header') : null;
      var bodyElem = tableBody.$el.querySelector('.vxe-table--body');
      var footerElem = tableFooter ? tableFooter.$el.querySelector('.vxe-table--footer') : null;
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      var leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce(function (previous, column) {
        return previous + column.renderWidth;
      }, 0);

      if (headerElem) {
        headerElem.style.marginLeft = "".concat(leftSpaceWidth, "px");
      }

      bodyElem.style.marginLeft = "".concat(leftSpaceWidth, "px");

      if (footerElem) {
        footerElem.style.marginLeft = "".concat(leftSpaceWidth, "px");
      }

      var containerList = ['main'];
      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        layoutList.forEach(function (layout) {
          var xSpaceElem = elemStore["".concat(name, "-").concat(layout, "-xSpace")];

          if (xSpaceElem) {
            xSpaceElem.style.width = "".concat(tableWidth + (layout === 'header' ? scrollYWidth : 0), "px");
          }
        });
      });
    },
    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace: function updateScrollYSpace() {
      var elemStore = this.elemStore,
          scrollYStore = this.scrollYStore;

      var _this$getTableData = this.getTableData(),
          fullData = _this$getTableData.fullData,
          tableData = _this$getTableData.tableData;

      this.tableData = tableData;
      var bodyHeight = fullData.length * scrollYStore.rowHeight;
      var topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
      var containerList = ['main', 'left', 'right'];
      containerList.forEach(function (name) {
        var layoutList = ['header', 'body', 'footer'];
        var tableElem = elemStore["".concat(name, "-body-table")];

        if (tableElem) {
          tableElem.style.marginTop = "".concat(topSpaceHeight, "px");
        }

        layoutList.forEach(function (layout) {
          var ySpaceElem = elemStore["".concat(name, "-").concat(layout, "-ySpace")];

          if (ySpaceElem) {
            ySpaceElem.style.height = "".concat(bodyHeight, "px");
          }
        });
      });
    },
    scrollTo: function scrollTo(x, y) {
      var bodyElem = this.$refs.tableBody.$el;

      if (_xeUtils.default.isNumber(x)) {
        bodyElem.scrollLeft = x;
      }

      if (_xeUtils.default.isNumber(y)) {
        bodyElem.scrollTop = y;
      }
    },
    scrollToRow: function scrollToRow(row) {
      var scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore,
          afterFullData = this.afterFullData,
          fullDataIndexMap = this.fullDataIndexMap,
          elemStore = this.elemStore;

      var rowId = _tools.UtilTools.getRowId(this, row, this.getRowMapIndex(row));

      if (scrollYLoad) {
        if (row === -1 && afterFullData.length) {
          row = afterFullData[afterFullData.length - 1];
        }

        if (fullDataIndexMap.has(row)) {
          var rowHeight = scrollYStore.rowHeight;
          var rowIndex = afterFullData.indexOf(row);
          this.scrollTo(null, (rowIndex - 1) * rowHeight);
        }
      } else {
        var bodyElem = elemStore['main-body-list'];

        _tools.DomTools.scrollIntoElem(bodyElem.querySelector("[data-rowid=\"".concat(rowId, "\"]")));
      }
    },
    scrollToColumn: function scrollToColumn(column) {
      var scrollXLoad = this.scrollXLoad,
          elemStore = this.elemStore,
          visibleColumn = this.visibleColumn,
          fullColumnIndexMap = this.fullColumnIndexMap;

      if (scrollXLoad) {
        if (column === -1 || fullColumnIndexMap.has(column)) {
          var scrollLeft = 0;

          for (var index = 0; index < visibleColumn.length; index++) {
            if (visibleColumn[index] === column) {
              break;
            }

            scrollLeft += visibleColumn[index].renderWidth;
          }

          this.scrollTo(scrollLeft);
        }
      } else {
        var bodyElem = elemStore['main-body-list'];

        _tools.DomTools.scrollIntoElem(bodyElem.querySelector(".".concat(column.id)));
      }
    },
    clearScroll: function clearScroll() {
      var _this20 = this;

      Object.assign(this.scrollXStore, {
        startIndex: 0
      });
      Object.assign(this.scrollYStore, {
        startIndex: 0
      });
      this.$nextTick(function () {
        var tableBody = _this20.$refs.tableBody;
        var tableBodyElem = tableBody ? tableBody.$el : null;
        var tableFooter = _this20.$refs.tableFooter;
        var tableFooterElem = tableFooter ? tableFooter.$el : null;

        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0;
          tableBodyElem.scrollLeft = 0;
        }

        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0;
        }
      });
      return this.$nextTick();
    },

    /**
     * 更新列状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, cellValue) {
      var _this21 = this;

      var customVal = !_xeUtils.default.isUndefined(cellValue);
      return this.$nextTick().then(function () {
        var $refs = _this21.$refs,
            tableData = _this21.tableData,
            editRules = _this21.editRules,
            validStore = _this21.validStore;

        if (scope && $refs.tableBody && editRules) {
          var row = scope.row,
              column = scope.column;
          var type = 'change';

          if (_this21.hasCellRules(type, row, column)) {
            var rowIndex = tableData.indexOf(row);

            var cell = _tools.DomTools.getCell(_this21, {
              row: row,
              rowIndex: rowIndex,
              column: column
            });

            if (cell) {
              return _this21.validCellRules(type, row, column, cellValue).then(function () {
                if (customVal && validStore.visible) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this21.clearValidate();
              }).catch(function (_ref9) {
                var rule = _ref9.rule;

                if (customVal) {
                  _tools.UtilTools.setCellValue(row, column, cellValue);
                }

                _this21.showValidTooltip({
                  rule: rule,
                  row: row,
                  column: column,
                  cell: cell
                });
              });
            }
          }
        }
      });
    },
    triggerValidate: function triggerValidate(type) {
      var _this22 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived;

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell;

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this22.clearValidate();
              }
            }
          }).catch(function (_ref10) {
            var rule = _ref10.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this22.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        }
      }

      return Promise.resolve();
    },

    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    fullValidate: function fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 对表格数据进行校验
     */
    validate: function validate(rows, cb) {
      return this.beginValidate(rows, cb);
    },

    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isAll) {
      var _this23 = this;

      var validRest = {};
      var status = true;
      var editRules = this.editRules,
          tableData = this.tableData,
          tableFullData = this.tableFullData,
          scrollYLoad = this.scrollYLoad,
          scrollYStore = this.scrollYStore;
      var vaildDatas = scrollYLoad ? tableFullData : tableData;

      if (rows) {
        if (_xeUtils.default.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = _xeUtils.default.isArray(rows) ? rows : [rows];
        }
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();
        vaildDatas.forEach(function (row) {
          var rowIndex = tableData.indexOf(row);
          var colVailds = [];
          columns.forEach(function (column, columnIndex) {
            if (_xeUtils.default.has(editRules, column.property)) {
              colVailds.push(new Promise(function (resolve, reject) {
                _this23.validCellRules('all', row, column).then(resolve).catch(function (_ref11) {
                  var rule = _ref11.rule,
                      rules = _ref11.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: rowIndex,
                    row: row,
                    columnIndex: columnIndex,
                    column: column
                  };

                  if (isAll) {
                    if (!validRest[column.property]) {
                      validRest[column.property] = [];
                    }

                    validRest[column.property].push(rest);
                    return resolve();
                  }

                  return reject(rest);
                });
              }));
            }
          });
          rowValids.push(Promise.all(colVailds));
        });
        return Promise.all(rowValids).then(function () {
          var ruleProps = Object.keys(validRest);

          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0]);
          }

          if (cb) {
            cb(status);
          }
        }).catch(function (params) {
          var args = isAll ? validRest : _defineProperty({}, params.column.property, params);
          return new Promise(function (resolve, reject) {
            var row = params.row;

            var finish = function finish() {
              params.cell = _tools.DomTools.getCell(_this23, params);

              _this23.handleValidError(params);

              if (cb) {
                status = false;
                resolve(cb(status, args));
              } else {
                reject(args);
              }
            };

            if (scrollYLoad) {
              var startIndex = scrollYStore.startIndex,
                  renderSize = scrollYStore.renderSize,
                  rowHeight = scrollYStore.rowHeight;

              var rowIndex = _this23.getRowMapIndex(row);

              if (rowIndex === -1) {
                rowIndex = tableFullData.indexOf(row);
              }

              if (rowIndex < startIndex || rowIndex > startIndex + renderSize) {
                var bodyElem = _this23.$refs.tableBody.$el;
                bodyElem.scrollTop = (rowIndex - 1) * rowHeight;
                return setTimeout(finish, debounceScrollYDuration * 2);
              }
            }

            finish();
          });
        });
      } else {
        if (cb) {
          cb(status);
        }
      }

      return Promise.resolve(true);
    },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        return rules && rules.find(function (rule) {
          return type === 'all' || !rule.trigger || type === rule.trigger;
        });
      }

      return false;
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, row, column, rowIndex, columnIndex}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules: function validCellRules(type, row, column, cellValue) {
      var _this24 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var cellVailds = [];

      if (property && editRules) {
        var rules = _xeUtils.default.get(editRules, property);

        var value = _xeUtils.default.isUndefined(cellValue) ? _xeUtils.default.get(row, property) : cellValue;

        if (rules) {
          rules.forEach(function (rule) {
            cellVailds.push(new Promise(function (resolve) {
              var isRequired = rule.required === true;

              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (_xeUtils.default.isFunction(rule.validator)) {
                  rule.validator(rule, value, function (e) {
                    if (_xeUtils.default.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: rule
                      };
                      errorRules.push(cusRule);
                    }

                    return resolve();
                  }, {
                    rules: rules,
                    row: row,
                    column: column,
                    rowIndex: _this24.getRowMapIndex(row),
                    columnIndex: _this24.getColumnMapIndex(column)
                  });
                } else {
                  var len;
                  var restVal = value;
                  var isNumber = rule.type === 'number';
                  var isEmpty = value === null || value === undefined || value === '';

                  if (isNumber) {
                    restVal = _xeUtils.default.toNumber(value);
                  } else {
                    len = _xeUtils.default.getSize(restVal);
                  }

                  if (isRequired && isEmpty) {
                    errorRules.push(rule);
                  } else if (isNumber && isNaN(value) || _xeUtils.default.isRegExp(rule.pattern) && !rule.pattern.test(value) || _xeUtils.default.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min) || _xeUtils.default.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max)) {
                    errorRules.push(rule);
                  }

                  resolve();
                }
              } else {
                resolve();
              }
            }));
          });
        }
      }

      return Promise.all(cellVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    clearValidate: function clearValidate() {
      var validTip = this.$refs.validTip;
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      });

      if (validTip && validTip.visible) {
        validTip.close();
      }

      return this.$nextTick();
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError: function handleValidError(params) {
      var _this25 = this;

      this.handleActived(params, {
        type: 'valid-error',
        trigger: 'call'
      }).then(function () {
        return _this25.showValidTooltip(params);
      });
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this26 = this;

      var $refs = this.$refs,
          tableData = this.tableData,
          _this$validConfig2 = this.validConfig,
          validConfig = _this$validConfig2 === void 0 ? {} : _this$validConfig2;
      var validTip = $refs.validTip;
      var rule = params.rule,
          row = params.row,
          column = params.column,
          cell = params.cell;

      var content = _tools.UtilTools.formatText(rule.message);

      this.$nextTick(function () {
        Object.assign(_this26.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: content,
          visible: true
        });

        if (validTip && (validConfig.message === 'tooltip' || tableData.length === 1)) {
          validTip.toVisible(cell, content);
        }

        _tools.UtilTools.emitEvent(_this26, 'valid-error', [params]);
      });
    },

    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportCsv: function exportCsv(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig;
      var opts = Object.assign({
        filename: 'table.csv',
        original: !!treeConfig,
        isHeader: true,
        download: true,
        data: null,
        columns: null,
        columnFilterMethod: function columnFilterMethod(column) {
          return ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property;
        },
        dataFilterMethod: null
      }, options);

      if (opts.filename.indexOf('.csv') === -1) {
        opts.filename += '.csv';
      }

      if (scrollXLoad || scrollYLoad) {
        opts.original = true;
      }

      var columns = visibleColumn;
      var oData = this.getTableData().fullData;

      if (treeConfig) {
        oData = _xeUtils.default.toTreeArray(oData, treeConfig);
      }

      return _tools.ExportTools.downloadCsc(opts, _tools.ExportTools.getCsvContent(opts, oData, columns, this.$el));
    },

    /*************************
     * Publish methods
     *************************/
    // 检查触发源是否属于目标节点
    getEventTargetNode: _tools.DomTools.getEventTargetNode
    /*************************
     * Publish methods
     *************************/

  }
};
exports.default = _default2;