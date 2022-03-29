export const distance = (x1:number,y1:number,x2:number,y2:number):number=>{
	let x_d = x2-x1;
	let y_d = y2-y1;
	
	return Math.sqrt(Math.pow(x_d,2)+Math.pow(y_d,2));
}

export const getQuadraticRoots = (a:number,b:number,c:number):(number|null)=>{
	let determinant = b*b - 4*a*c;
	if(determinant < 0) return null;
	determinant = Math.sqrt(determinant);

	const root1 = (-b - determinant)/(2*a);
	const root2 = (-b + determinant)/(2*a);
	if(root1 >=0) return root1;
	if(root2 >=0) return root2;
	return null;
}

export const randomInRange = (min: number, max:number):number => {
	return Math.random() * (max - min + 1) + min;
}

export const NullCheck = (value:any, fallback:any) => {
	return value?value:fallback;
}
