import assert from "assert"

const InstanceUtils = {
	findFirstChild(target: Instance | any, name: string, recursive = false) {
		const children = target instanceof Instance ? target.Children : target
		
		for(const child of children) {
			if(child.getProperty("Name") === name) {
				return child
			}
		}
		
		if(recursive) {
			const arrays = [children]
			
			while(arrays.length) {
				for(const desc of arrays.shift()) {
					if(desc.getProperty("Name") === name) {
						return desc
					}
					
					if(desc.Children.length) {
						arrays.push(desc.Children)
					}
				}
			}
		}
		
		return null
	},
	
	findFirstChildOfClass(target: Instance | any, className: string, recursive = false) {
		const children = target instanceof Instance ? target.Children : target
		
		for(const child of children) {
			if(child.getProperty("ClassName") === className) {
				return child
			}
		}
		
		if(recursive) {
			const arrays = [children]
			
			while(arrays.length) {
				for(const desc of arrays.shift()) {
					if(desc.getProperty("ClassName") === className) {
						return desc
					}
					
					if(desc.Children.length) {
						arrays.push(desc.Children)
					}
				}
			}
		}
		
		return null
	}
}

class InstanceRoot extends Array {
	findFirstChild(...args: any[]) { return InstanceUtils.findFirstChild(this, args[0], args[1]) }
	findFirstChildOfClass(...args: any[]) { return InstanceUtils.findFirstChildOfClass(this, args[0], args[1]) }
}

class Instance {
    public Children: any = [];
    public Properties: any = {};

	static new(className: string) {
		assert(typeof className === "string", "className is not a string")
		return new Instance(className)
	}

	constructor(className: string) {
		assert(typeof className === "string", "className is not a string")
		
		this.Children = []
		this.Properties = {}

		this.setProperty("ClassName", className, "string")
		this.setProperty("Name", "Instance", "string")
		this.setProperty("Parent", null, "Instance")
	}

	setProperty(name: string, value: any, type: any) {
		if(!type) {
			if(typeof value === "boolean") {
				type = "bool"
			} else if(value instanceof Instance) {
				type = "Instance"
			} else {
				throw new TypeError("You need to specify property type")
			}
		}

		let descriptor = this.Properties[name]
		if(descriptor) {
			assert(descriptor.type === type, `Property type mismatch ${type} !== ${descriptor.type}`)

			if(name === "Parent" && descriptor.value instanceof Instance) {
				const index = descriptor.value.Children.indexOf(this)
				if(index !== -1) {
					descriptor.value.Children.splice(index, 1)
				}
			}

			descriptor.value = value
		} else {
			descriptor = this.Properties[name] = { type, value }
		}

		if(name === "Parent") {
			if(descriptor.value instanceof Instance) {
				descriptor.value.Children.push(this)
			}
		}

		if(name !== "Children" && name !== "Properties" && !(name in Object.getPrototypeOf(this))) {
			(this as any)[name] = value
		}
	}
	
	getProperty(name: string, caseInsensitive: boolean = false) {
		const descriptor = this.Properties[name] || caseInsensitive && Object.entries(this.Properties).find(x => x[0].toLowerCase() === name.toLowerCase())?.[1]
		return descriptor ? descriptor.value : undefined
	}

	hasProperty(name: string, caseInsensitive: boolean = false) {
		return name in this.Properties || caseInsensitive && !Object.entries(this.Properties).find(x => x[0].toLowerCase() === name.toLowerCase())
	}
	
	findFirstChild(...args: any[]) { return InstanceUtils.findFirstChild(this, args[0], args[1]) }
	findFirstChildOfClass(...args: any[]) { return InstanceUtils.findFirstChildOfClass(this, args[0], args[1]) }
}

export {Instance, InstanceRoot}