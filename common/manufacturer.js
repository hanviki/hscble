// 此处存储厂商提供的服务Id
let data = [{
	id: 'sxs',
	name: '0000FFE400001000800000805F9B34FB', // 设备名称
	type: 'wirte', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FFE0-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FFE4-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: false,
		notify: true,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'wer',
	name: '0000FFE900001000800000805F9B34FB', // 设备名称
	type: 'get', // 设备类型
	manufacturer_name: '蓝牙->APP', // 厂商
	serviceId: "0000FFE5-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FFE9-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit1',
	name: '0000FF9100001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF91-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}
, {
	id: 'edit2',
	name: '0000FF9200001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF92-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}
, {
	id: 'edit3',
	name: '0000FF9300001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF93-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}
, {
	id: 'edit4',
	name: '0000FF9400001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF94-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}
, {
	id: 'edit5',
	name: '0000FF9500001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF95-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit6',
	name: '0000FF9600001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF96-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit7',
	name: '0000FF9700001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF97-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit8',
	name: '0000FF9800001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF98-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'edit9',
	name: '0000FF9900001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FF90-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FF99-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: true,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'new',
	name: '0000FFC100001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FFC0-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FFC1-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: true,
		notify: false,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}, {
	id: 'new2',
	name: '0000FFC200001000800000805F9B34FB', // 设备名称
	type: 'edit', // 设备类型
	manufacturer_name: 'APP->蓝牙', // 厂商
	serviceId: "0000FFC0-0000-1000-8000-00805F9B34FB", // 蓝牙特征值对应服务的 uuid
	characteristicId: "0000FFC2-0000-1000-8000-00805F9B34FB", // 蓝牙特征值的 uuid
	properties:{
		read: false,
		write: false,
		notify: true,
		indicate: false
	},
	notify: false, //是否开启了通知获取，
	value: '' //获取的值 开启了通知才会有
}]
module.exports = {
	data: data
}
