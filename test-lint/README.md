# lint & test

> 代码测试、规范及集成

## 测试 test

> 在已经开发完成的软件之上采用「人工或非人工」的方式验证软件是否符合工程预期，是否会造成用户/开发商损失等潜在问题的一种方式。

- [自动化测试](https://juejin.im/post/6844904194600599560)

- 提高代码质量
- 准确定位问题
- 方便迭代、重构
- 最大程度保证产品符合预期
- 减少回归流程
- 提升开发者信心和安全感

**测试自动化收益 = 迭代次数 X 全手动执行成本 - 首次自动化成本 - 维护次数 X 维护成本**.

### 测试类型

> 前端测试主要分为 3 种：**「单元测试（Unit Test）」、「集成测试（Integration Test）」、「UI 测试（UI Test）」**

- 单元测试
  - 代码中多个组件共用的工具类库、多个组件共用的子组件等，一定低耦合的。
  - 通常情况下，在公共函数/组件中一定要有单元测试来保证代码能够正常工作。
  - 单元测试也应该是项目中数量最多、覆盖率最高的。

- 集成测试
  - 耦合度较高的函数/组件、经过二次封装的函数/组件、多个函数/组件组合而成的函数/组件等
  - 目的在于，测试经过单元测试后的各个模块组合在一起是否能正常工作。会对组合之后的代码整体暴露在外接口进行测试，查看组合后的代码工作是否符合预期
  - 集成测试用例设计合理且测试都通过能够很大程度保证产品符合预期

- UI测试
  - UI 测试（UI Test）只是对于前端的测试，是脱离真实后端环境的，仅仅只是将前端放在真实环境中运行，而后端和数据都应该使用 Mock 的
  - 端到端测试（E2E Test）则是将整个应用放到真实的环境中运行，包括数据在内也是需要使用真实的。
  - 大多数还依赖于手工测试

### 哪些项目适合引入自动化测试

> 在前端自动化测试方面，抛开项目类型、软件开发的人员配置和生命周期而谈论自动化测试的好处和必要性，是耍流氓

- 公共库类的开发维护
- 中长期项目的迭代/重构
- 引用了不可控的第三方依赖

这些场景是需要引入自动化测试来对现有代码进行约束的。**尤其是中长期项目，迭代/重构时人力回归困难，自动化测试就显得尤为重要！**

### 测试思想

- TDD：Test-Driven Development（测试驱动开发）：TDD 则要求在编写某个功能的代码之前先编写测试代码，然后只编写使测试通过的功能代码，通过测试来推动整个开发的进行
- BDD：Behavior-Driven Development（行为驱动开发）：BDD 可以让项目成员（甚至是不懂编程的）使用自然语言来描述系统功能和业务逻辑，从而根据这些描述步骤进行系统自动化的测试
