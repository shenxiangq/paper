a_blocks(tree):
BS = []
a_elements = tree.getElements(‘a’)
filter_valid_a(a_elements) # 按域名和锚文本长度筛选
delete_same_a(a_elements)  # 删除重复的链接
for ak in a_elements:
  if ak.visited:
    continue
  R = xpath('')
  ance_level = 0; contain_level = 0;
  p = ak.getParent() # 获取父节点
  while ance_level <= MAX_ANCE_LEVEL and contain_level <= MAX_CONTAIN_LEVEL:
    R.addPath(p)
    if p is CONTAINER_NODE and p.children.length > 1:
      contain_level ++;
      GA = p.find_by_xpath(R)
      if GA.length > MIN_LINK_NUM:
        BS.append([p, R])
        GA.visited = TRUE
        break

    ance_level ++;    
    iter_node = iter_node.getParent()
return BS
  
merge_blocks(BS):
for ance, R in BS:
  if ance.visited:
    continue
  p = ance.getParent()
  A = getChildren(p, BS)
  if A.length >= MIN_MERGE_NUM and all_same(A):
    BS.remove(A)
    R.addPath(p)
    BS.append([p, R])
    A.visited = TRUE
return BS
    

filter_template_block(BS):
GS = group_by_url_domain(BS) #按照url域名分组
for G in GS:
  M = HashMap<String, Integer>() 
  for bs in G:
    for bi in bs:
      urls = bi.get_all_urls() 
      urls.sort()
	  string_key = urls.concat() #将该区块的所有URL拼接
      bi.string_key = string_key
      M[string_key] += 1 #特征字符串出现次数+1
  MIN_REPEAT_TIME = MAX(sum(M.values()), 5)
  repeated = filter(M, value >= MIN_REPEAT_TIME)
  for bs in G:
    for bi in bs:
      if bi.string_key in repeated:
        bs.remove(bi)
return BS


class CountDownLatch(object):
    def __init__(self, counter, original_d, allDoneCallBack):
        self.counter = counter # 任务总数
        self.original_d = original_d  # 原有的Deferred对象
        self.allDoneCallBack = self.allDoneCallBack # 全部任务结束后的回调
        self.results = [] # 任务结果
        self.id = 0  # 任务id
    
    def add(self, func, *args):
        d = defer.Deferred()
        d.addCallback(func, *args)
        d.addCallback(self.count_down, self.id)
        self.id += 1

    def count_down(self, result, id):
        self.counter -= 1
        self.results[id] = result
        if self.counter == 0:
            self.original_d.addCallback(self.allDoneCallBack, self.results)