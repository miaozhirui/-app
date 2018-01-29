export default {
  /**
   * [relationship ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getRelationType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '配偶';
      break;
    case 2:
      result = '父母';
      break;
    case 4:
      result = '兄弟姐妹';
      break;
    case 6:
      result = '朋友';
      break;
    case 7:
      result = '同事';
      break;
    default:
      result = '';
    }
    return result;
  },

  /**
   * [compNatureType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getCompNatrueType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '国企机关';
      break;
    case 2:
      result = '事业单位';
      break;
    case 3:
      result = '国有企业';
      break;
    case 4:
      result = '外资或合资';
      break;
    case 5:
      result = '私营企业';
      break;
    case 6:
      result = '其他';
      break;
    default:
      result = '';
    }
    return result;
  },
  /**
   * [worklevelType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getWorklevelType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '员工';
      break;
    case 2:
      result = '基层管理人员';
      break;
    case 3:
      result = '中层管理人员或同级';
      break;
    case 4:
      result = '高层管理人员或同级';
      break;
    case 5:
      result = '自雇人士－私营或个体';
      break;
    default:
      result = '';
    }
    return result;
  },

  /**
   * [educationType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  geteEducationType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '中专、高中及以下';
      break;
    case 2:
      result = '大专';
      break;
    case 3:
      result = '本科';
      break;
    case 4:
      result = '研究生及以上';
      break;
    case 5:
      result = '其他';
      break;
    default:
      result = '';
    }
    return result;
  },

  /**
   * [merriageType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getMerriageType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '未婚';
      break;
    case 2:
      result = '已婚-无子女';
      break;
    case 3:
      result = '已婚-有子女';
      break;
    case 4:
      result = '离异';
      break;
    case 5:
      result = '丧偶';
      break;
    default:
      result = '';
    }
    return result;
  },

  /**
   * [spouseType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getSpouseType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '上班族';
      break;
    case 2:
      result = '全职太太（或先生)';
      break;
    default:
      result = '';
    }
    return result;
  },

  /**
   * [householdType ]
   * @param  {[integer]} type [类型]
   * @return {[string]}      [格式字符串呢]
   */
  getHouseholdType(type) {
    var result = ''
    switch(type)
    {
    case 1:
      result = '有本地户口';
      break;
    case 2:
      result = '无本地户口';
      break;
    default:
      result = '';
    }
    return result;
  }

}
