import 'reflect-metadata';

export function PropertyType(type: any) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata('custom:property-type', type, target, propertyKey);
	};
}
