// 此处存储厂商提供的服务Id
let data = [{
	id: 'sxs',
	name: '6E400002B5A3F393E0A9E50E24DCCA9E', // 设备名称
	type: 'wirte', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值对应服务的 uuid
	characteristicId: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'wer',
	name: '6E400003B5A3F393E0A9E50E24DCCA9E', // 设备名称
	type: 'get', // 设备类型
	manufacturer_name: '蓝牙->APP', // 厂商
	serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值对应服务的 uuid
	characteristicId: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: false,
		notify: true,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit',
	name: '6E400004B5A3F393E0A9E50E24DCCA9E', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值对应服务的 uuid
	characteristicId: "6E400004-B5A3-F393-E0A9-E50E24DCCA9E", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: true,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}]
module.exports = {
	data: data
}
