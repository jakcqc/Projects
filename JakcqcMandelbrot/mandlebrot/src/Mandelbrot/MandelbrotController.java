/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Mandelbrot;

import java.awt.event.InputEvent;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.beans.value.ObservableValue;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.TextField;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
/**
 *
 * @author zasd180
 */


public class MandelbrotController extends Switchable implements Initializable, display{
    Mandelbrot model;
    
    @FXML
    Canvas canvas;
    @FXML
    TextField Steps;
    @FXML 
    Text error;
    
    int intSteps;
    String getSteps;
    double c;
    double ci;
    int xR; 
    int yR;
    
    @FXML
    private void changeScene(ActionEvent event){
        Switchable.switchTo("Intro");
        
        IntroController controller = (IntroController)getControllerByName("Intro");
    }
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
         model = new Mandelbrot(); 
                Steps.setText(""+model.readStepFile());
                newCanvas();
           
    } 
    @Override
    public int getSteps(){
        if (Steps.getText().isEmpty())
        {
               error.setText("~Please enter a number!~");
               Steps.setText("50");
               model.writeStepFile(50);
               return 50;
               
        }
        else{
            getSteps = Steps.getText(); 
        }
         if (getSteps.matches("\\d*")) {
             error.setText("");
            intSteps = Integer.parseInt(getSteps);
         }
         else{
             error.setText("~Please enter a number between 0 and 500!~");
             intSteps = 50;
         }
        if(intSteps < 0 || intSteps>500){
            error.setText("~Please enter a number between 0 and 500!~");
            intSteps = 50;
        }
           Steps.setText(""+intSteps);
           model.writeStepFile(intSteps);
         return intSteps;
    }
    @FXML
    private void reDraw(ActionEvent event){
        
        newCanvas();
    }
    @Override
    public void newCanvas(){
        intSteps = getSteps();
        double precision = model.getPrecision();
        GraphicsContext temp = canvas.getGraphicsContext2D();
         for ( c = -2,xR = 0; xR < 740; xR++, c = model.getC(precision, c)) {
             //c = model.getC(precision, c);
           for (ci = -1.2,yR = 0; yR < 605; yR++,ci = model.getCi(precision, ci)) {
               
               //ci = model.getCi(precision, ci);
               
                  Color color = model.paintSet(temp, -2, 1, -1.2, 1.2, intSteps,c,ci,xR,yR);
                  temp.setFill(color);
                  temp.fillRect(xR, yR, 1, 1);
           }
         }
       
    }

    
    
   
    
}
