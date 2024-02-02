// initialData.ts
export const initialData = `
{
    "soc": "sr6x7",
    "revision": 0,
    "gic": {
      "name": "gicv3",
      "region": [1837105152, 1048576]
    },
    "uart0": {
      "name": "uart",
      "region": [305419896, 2271560481],
      "interrupt": [3]
    },
    "vm0": {
      "name": "VM0",
      "entry": 671612928,
      "cluster": 0,
      "core": [
        [0, 128]
      ],
      "memory": [
        [671612928, 262144],
        [1610612736, 131072]
      ],
      "devices": [
        {
          "name": "gicv3",
          "region": [1837105152, 1048576]
        },
        {
          "name": "uart",
          "region": [305419896, 2271560481],
          "interrupt": [3]
        }
      ]
    },
    "vm1": {
      "name": "VM1",
      "entry": 671875072,
      "cluster": 0,
      "core": [
        [0, 128]
      ],
      "memory": [
        [671875072, 262144],
        [1610874880, 131072]
      ]
    },
    "domains": [
      {
        "name": "VM0",
        "entry": 671612928,
        "cluster": 0,
        "core": [
          [0, 128]
        ],
        "memory": [
          [671612928, 262144],
          [1610612736, 131072]
        ],
        "devices": [
          {
            "name": "gicv3",
            "region": [1837105152, 1048576]
          },
          {
            "name": "uart",
            "region": [305419896, 2271560481],
            "interrupt": [3]
          }
        ]
      },
      {
        "name": "VM1",
        "entry": 671875072,
        "cluster": 0,
        "core": [
          [0, 128]
        ],
        "memory": [
          [671875072, 262144],
          [1610874880, 131072]
        ]
      }
    ]
  }
  `;
