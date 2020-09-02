
// 已废弃方法
// let buffer = new Buffer(20)
// console.log(buffer);

//三种方式创建
// 1.Buffer.alloc()
let buf1 = Buffer.alloc(20)
console.log(buf1);

let buf2 = Buffer.alloc(20, 10)
console.log(buf2);

// 2.Buffer.allocUnsafe()
let buf3 = Buffer.allocUnsafe(20)
console.log(buf3)

// 3.Buffer.from()
let arr = [10, 20, 30, 40]
let buf4 = Buffer.from(arr)
console.log(buf4);

let buf5 = Buffer.from('俩科学院')
console.log(buf5);
console.log(buf5.toString());

// 常用的方法
// 1.fill() 手动初始化
// fill(value: string | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): this;
buf5.fill(0, 4)
console.log(buf5);
console.log(buf5.toString());

// 2.write() 写入
// write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;
buf5.write('俩颗', 0, 6, 'utf8')
console.log(buf5);