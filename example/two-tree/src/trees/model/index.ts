// mock model
let model1
let model2
let model3
let model4

model1 = {
    id:1,
    att1:model2,
    att2:model3,
    att3:model4,
    prop1:1,
    prop2:2,
    prop3:3,
}

model2 = {
    id:2,
    att1:model3,
    att2:model4,
    att3:model1,
    prop1:1,
    prop2:2,
    prop3:3,
}

model3 = {
    id:3,
    att1:model4,
    att2:model1,
    att3:model2,
    prop1:1,
    prop2:2,
    prop3:3,
}

model4 = {
    id:4,
    att1:model1,
    att2:model2,
    att3:model3,
    prop1:1,
    prop2:2,
    prop3:3,
}

const models = [model1,model2,model3,model4]

export default models