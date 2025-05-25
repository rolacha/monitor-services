bluetooth.startAccelerometerService()
bluetooth.startButtonService()
bluetooth.startIOPinService()
bluetooth.startLEDService()
bluetooth.startTemperatureService()
basic.showString("MONITOR SERVICES")
let allowedUID=""
let motiondetected=0
let gasLevel=0
let temp=0
let hum=0
let uidArray=0
let uid=""
dht11_dht22.readDataSuccessful()
servos.P0.setAngle(90)
makerbit.connectLcd(39)
MFRC522.Init()
allowedUID="12345678"
dht11_dht22.selectTempType(tempType.celsius)
makerbit.showStringOnLcd1602("Smart home ready", 0, 16)
basic.pause(2000)
makerbit.clearLcd1602()
serial.redirectToUSB()
MFRC522.Init()
basic.showIcon(IconNames.Happy)
basic.forever(function(){
    motiondetected=pins.digitalReadPin(DigitalPin.P1)
    gasLevel=pins.analogReadPin(AnalogPin.P4)
    dht11_dht22.readDataSuccessful();
    temp=dht11_dht22.readData(dataType.temperature)
    hum=dht11_dht22.readData(dataType.humidity)
    if(motiondetected){
        pins.digitalWritePin(DigitalPin.P2,1)
        makerbit.showStringOnLcd1602("Motion yess", 0, 0)
        if(temp<30)
              if(MFRC522.read){
                  MFRC522.getID;
                  uidArray=MFRC522.getID()
                  uid=""
                  serial.writeLine("UID: "+uid)
              }
                if(uid==allowedUID){
                    makerbit.showStringOnLcd1602("Access", 0, 0)
                    servos.P0.setAngle(90)
                    basic.pause(3000)
                    servos.P0.setAngle(0)
                    
                }
        
        else{

            makerbit.showStringOnLcd1602("not Access", 0, 1)
        }}
        else{

            makerbit.showStringOnLcd1602("high temp", 0, 1)
        }
        
    

if(!motiondetected){
    pins.digitalWritePin(DigitalPin.P2,0)
    servos.P0.setAngle(0)
}
basic.pause(2000)
makerbit.showStringOnLcd1602("Gas"+gasLevel+"temp "+temp+" C",0,1)
basic.pause(2000)
makerbit.showStringOnLcd1602("hundidity"+hum+"% ", 0, 1)
basic.pause(2000)
})