/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Mandelbrot;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.CanvasBuilder;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
 
/**
 * @author jeffrey
 */
public class Mandelbrot extends FractalConvergance{
 
    protected double getPrecision(){
         double precision = Math.max((1 +2) / 740, (1.2 +1.2) / 605);
         return precision;
    }
    protected double getC(double p, double c){
        
        c = c + p;
                return c;
    }
    protected double getCi(double p,double ci){
        
        ci = ci + p;
                return ci;
    }
    protected Color paintSet(GraphicsContext ctx, double reMin, double reMax, double imMin, double imMax, int Steps, double c, double ci, double xR, double yR) {
        double precision = Math.max((reMax - reMin) / 740, (imMax - imMin) / 605);
        int convergenceSteps = Steps;
      
                double convergenceValue = checkConvergence(ci, c, convergenceSteps);
                double t1 = (double) (convergenceValue) / convergenceSteps;
                double c1 = Math.min(255 * 2 * t1, 255);
                double c2 = Math.max(255 * (2 * t1 - 1), 0);
                
                
                if (convergenceValue != convergenceSteps) {
                        
                        return (Color.color(c1/255.0,c2/255.0,c1/255.0));
                       
                    
                    
                    
                } else {
                    
                    return(Color.ALICEBLUE);
                    
                }
               
    }
 
    
    
    protected int readStepFile(){
        int stepNumber = 0;
   try {
            FileReader reader = new FileReader("MandelbrotStep.txt");
            BufferedReader bufferedReader = new BufferedReader(reader);
 
            String line;
 
            while ((line = bufferedReader.readLine()) != null) {
                stepNumber = Integer.parseInt(line);
            }
            reader.close();
            return stepNumber;
 
        } catch (IOException e) {
            writeStepFile(50);
            return 50;
        }
    }
    protected void writeStepFile(int Steps){
     try {
            FileWriter writer = new FileWriter("MandelbrotStep.txt");
            writer.write(new Integer(Steps).toString());
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
}
