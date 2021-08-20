const envKeys: string[] = ['PORT', 'NODE_ENV', 'LOG_LEVEL']

function getEnvironmentVariablesConfig(): any {
  let config: any = {}
  const keys = Object.keys(process.env).filter((key: string) => /^APP__.*/.test(key)).concat(envKeys)
  keys.forEach((key: string) => config[key.replace(/^APP__/, '')] = process.env[key])
  const objectKeys = Object.keys(config).filter((key: string) => /\ *.__.*/g.test(key))
  config = { ...config, ...buildEnvObjects(objectKeys, config) }
  objectKeys.forEach((value: string) => delete config[value])
  return config
}

function buildEnvObjects(keys: any, config: any): any {
  const envObjects: any = {}
  keys.forEach((key: string) => {
    const splittedKey = key.split('__').reverse()

    let tempObj: any = {}

    splittedKey.forEach((value: string, index: number) => {
      if (index === 0) {
        tempObj[value] = config[key]
      } else if (index === splittedKey.length - 1) {
        if (!(value in envObjects)) {
          envObjects[value] = tempObj
        } else {
          envObjects[value] = { ...envObjects[value], ...tempObj }
        }
      } else {
        const obj2: any = {}
        obj2[value] = tempObj
        tempObj = obj2
      }
    })
  })
  return envObjects
}

const configuration: any = getEnvironmentVariablesConfig()
export default configuration
