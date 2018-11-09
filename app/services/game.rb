module Game
  DEFAULT_AMOUNT = 0
  PRODUCER_LIST = ['Auto Clicker', 'Auto Oven', 'Cookie Farm', 'Cookie Factory', 'Cookie Reactor', 'Cookie Materialiser', 'Quantum Cookie Singularity', 'Admin Cookie Creator']

  PRODUCERS = {
      #'Hand': {'price': 8, 'performance': 1},
      'Auto Clicker': {price: 8, performance: 1},
      'Auto Oven': {price: 64, performance: 8},
      'Cookie Farm': {price: 512, performance: 64},
      'Cookie Factory': {price: 4096, performance: 512},
      'Cookie Reactor': {price: 32768, performance: 4096},
      'Cookie Materialiser': {price: 262144, performance: 32768},
      'Quantum Cookie Singularity': {price: 2097152, performance: 262144},
      'Admin Cookie Creator': {price: 134217728, performance: 4194304},
  }
end