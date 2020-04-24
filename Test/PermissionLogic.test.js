const PermissionLogic = require('../BussinessLogic/PermissionLogic')
const permissionLogic = new PermissionLogic()
describe('Permission', () => {
   test('should be PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.isSuccessed).toBe(true)
   })
   test('should be  user=16 and action_id =2 AND PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(16, 2)
      expect(result.isSuccessed).toBe(true)
   })
   test('should be user=16 and action_id =3 PermissionQualify true', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(16, 3)
      expect(result.isSuccessed).toBe(undefined)
   }
   )
   test('should be user=17 and action_id =7 PermissionQualify false', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(17, 7)
      expect(result.isSuccessed).toBe(undefined)
   })
   test.skip('Message should contain Cannot Connect to Database', async () => {
      let result = null
      result = await permissionLogic.isPermissionQualify(47, 1)
      expect(result.message).toMatch(/to Database/)
      console.log(result.message);

   })
}
)
