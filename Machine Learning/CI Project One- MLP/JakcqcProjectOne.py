import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import sys
import random

#derivative of tanh 
def tanh(x, derive=False):
    if derive:
        return 1 - np.power(x, 2)
    return np.tanh(x)

#given values
eta = .2
err = 0
greenWeights = np.array([1.73673761,1.89791391,-2.10677342,-0.14891209,.58306155])
orangeWeights = np.array([-2.25923303, 0.13723954,-0.70121322,-0.62078008,-0.47961976]) 
trainingData = np.array([
                    [0,0,0.8,0.4,0.4,0.1,0,0,0,-1],
                    [0,0.3,0.3,0.8,0.3,0,0,0,0,1],
                    [0,0,0,0,0.3,0.3,0.8,0.3,0,1],
                    [0,0,0,0,0,0.8,0.4,0.4,0.1,-1],
                    [0.8,0.4,0.4,0.1,0,0,0,0,0,-1],
                    [0,0,0,0,0,0.3,0.3,0.8,0.3,1]
                    ])

#total weights output                  
outputWeights = np.array([1.20973877,-1.07518386,0.80691921,-0.29078347,-0.22094764,-0.16915604, 1.10083444,0.08251052,-0.00437558,-1.72255825,1.05755642,-2.51791281,-1.91064012])

#training data 
############################
 
for inputs in trainingData:

    #setup
    greenOutputs = np.ones(6)
    orangeOutputs = np.ones(6)
    
#forward pass 
#################################

    for i in range(6):
        
        #green layer forward pass
        greenOutputs[i] = np.dot(inputs[i:i+4],greenWeights[0:4])
        greenOutputs[i] += greenWeights[4] 
        greenOutputs[i] = tanh(greenOutputs[i])

        #orange layer forward pass
        orangeOutputs[i] = np.dot(inputs[i:i+4],orangeWeights[0:4])
        orangeOutputs[i] += orangeWeights[4]
        orangeOutputs[i] = tanh(orangeOutputs[i])

    #total output weights  
    totalOutputs = np.append(greenOutputs, orangeOutputs)
    
    #output layer forward pass
    outputEnd = np.dot(totalOutputs, outputWeights[0:12])
    outputEnd += outputWeights[12]
    outputEnd = tanh(outputEnd)

    #apply sum of squares 
    expected = inputs[9] #expected value
    err += .5 * np.power((expected-outputEnd), 2) #sum of squares
    

#backprop
################################

    #derivative of SSE
    delta_1 = expected-outputEnd #final err value
    
    #tanh deriv of output
    delta_2 = tanh(outputEnd, True) 

    #Total outputs 
    totalOutputs = np.append(totalOutputs, inputs[9])
    deltaOutput = np.ones(13) 

    #Delta output values
    deltaOutput = totalOutputs * (delta_1 * delta_2) #applying delta rule

    #Each edge in each layer 
    for i in range(6):

        #Green layer delta
        delta_3 = tanh(greenOutputs[i], True) 

        #Orange layer delta
        delta_4 = tanh(orangeOutputs[i], True) 

        deltaGreen = np.zeros(6) 
        deltaOrange = np.zeros(6)

        #Backprop algorithm
        for j in range(5): 
            if j < 5:
                deltaGreen[j] += inputs[j+i] * delta_3 * ((delta_1 * delta_2) * outputWeights[i])
                deltaOrange[j] += inputs[j+i] * delta_4 * ((delta_1 * delta_2) * outputWeights[i+6])

        #Update bias with an input of 1 assumed
                deltaGreen[5] +=delta_3 * ((delta_1 * delta_2) * outputWeights[i])
                deltaOrange[5] +=delta_4 * ((delta_1 * delta_2) * outputWeights[i+6])
            

    #Apply the average delta for both layers
    deltaGreen = deltaGreen/6 
    deltaOrange = deltaOrange/6

#Update Values from gradient and backprop 
######################

    for i in range(5):
        greenWeights[i] = greenWeights[i] + (eta * deltaGreen[i])
        orangeWeights[i] = orangeWeights[i] + (eta * deltaOrange[i])  

    for i in range(13):
        outputWeights[i] = outputWeights[i] + (eta * deltaOutput[i])


     
#test outputs
print("\n",greenWeights,orangeWeights,"\n\n",outputWeights,)


