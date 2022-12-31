# Scala

- [Code body](#code-body)
- [Displaying to the standard output](#displaying-to-the-standard-output)
- [Reading from the standard input](#reading-from-the-standard-input)
- [Strings](#strings)
- [if/else](#ifelse)
- [For loop](#for-loop)
- [List](#list)
- [Methods (functions)](#methods-functions)
- [Array](#array)
- [ArrayBuffer](#arraybuffer)
- [Some mathematical operations over arrays of numbers](#some-mathematical-operations-over-arrays-of-numbers)
- [Multi-dimensional array](#multi-dimensional-array)
- [Maps](#maps)
- [Tuples](#tuples)
- [Classes](#classes)
- [Inheritance](#inheritance)
- [Abstract classes](#abstract-classes)
- [Traits](#traits)
- [Higher order functions](#higher-order-functions)
- [File I/O](#file-io)
- [Exception handling](#exception-handling)


## Code body

```scala
object Tutorial {
  def main(args: Array[String]): Unit = {
    // the code body goes here
  }
}
```

- Here, the method `main` takes the command line
  arguments, an array of strings, as the parameters.
- `Unit` is equivalent to `void`.

## Displaying to the standard output

```scala
var myName = "Arian"
val myAge = 30
val myWeight = 70.5
print(s"My name is $myName and ")
printf("I am %d years old. ", myAge)
println(f"My weight is $myWeight%.2f kg.")
```
- The `s` interpolator allows you to plug in variables
  or expressions, while the `f` interpolator allows you
  to use formatting commands.
- The difference between `print` and `println` is that
  the latter adds a newline to the end of the string,
  while, the former one does not.

## Reading from the standard input

You can use the methods:
- `scala.io.StdIn.readLine()` for reading strings,
- `scala.io.StdIn.readInt()` for reading integers,
- `scala.io.StdIn.readFloat()`  for reading
  floats,
- `scala.io.StdIn.readDouble()`  for reading
  floats,
- `scala.io.StdIn.readByte()` for reading bytes.

```scala
var myString = ""
myString = scala.io.StdIn.readLine()
```

## Strings

- The strings should be specified inside double
  quotations, i.e. `"string"`.
- `str.length` returns the length of the string `str`.
- `str(i)` returns the $i^{th}$ character of `str`.
- `str1.concat(str2)` concatenates the two strings
  `str1` and `str2`.
- `str1.equals(str2)` returns `true` if the two strings
  `str1` and `str2` equals and returns `false`
  otherwise.
- `str1.indexOf(str2)` returns back the index of the
  first appearance of `str2` in `str1`. If `str2` does
  not appear in `str1`, the method returns -1.
- `str.toArray` converts the string `str` to an array.

## if/else 
```scala
if (x < 0) {
  println("negative")
} else if (x == 0) {
  println("zero")
} else {
  println("positive")
}
```

## For loop

```scala
for (i <- 1 to 3 if i%2==0)
  println(i)
```

- One should use the brackets `{}` if the loop body is
  more than one line.
- The `if` statement in the loop condition is called
  `guard`.

In case you have nested `for` loops, even with guards,
you can write the code as follows:

```scala
for {
  i <- 1 to 3
  j <- 'a' to 'c'
  if i == 2
  if j == 'b'
} {
  println(s"i = $i, j = $j")
}
```

which is equivalent to:

```scala
for (i <- 1 to 3 if i == 2)
  for (j <- 'a' to 'c' if j == 'b')
    println(s"i = $i, j = $j")
```
- Note that `i <- 1 to 3` is inclusive, i.e. the end of
  the interval is included. In case of an exclusive
  loop condition, one can use the keyword `until` instead of `to`.
  

## List

```scala
val foo = List("This", "is", "a", "sample", "text.")
val evenNums = for (i <- 1 to 20 if i%2==0) yield i
```

- There are two different data types `var` and
  `val` in scala. The former stands for *variable*
  which can change along the program, but the
  latter stands for *value* which is fixed, and it
  can not change.


## Methods (functions)

```scala
def methodName(param1: Type, param2: Type): Type =
  // the method body goes here
end methodName
```

- Declaring the method return type is optional
- Providing the `end methodName` portion after the
  method body is also optional, and is only
  recommended for long methods
- If any of the method parameters has a default value,
  it can be specified as `param: Type = default`.

Example 1: A method which determines if an input integer
is prime or not

```scala
object MethodTutorial {

  def is_prime(n: Int): Boolean = {
    for (i <- 2 to n-1){
      if (n%i == 0)
        return false
    }
    return true
  }

  def main(args: Array[String]): Unit = {
    println(is_prime(n=args(0).toInt))
  }
}
```

Example 2: A method which takes a *bunch* of integers
and returns their summation

```scala
def getSum(args: Int*): Int = {
  var sum: Int = 0
  for (num <- args){
    sum += num
  }
  sum
}
```

Example 3: A method which calculates the factorial of
an input integer in a recursive way

```scala
def factorial(n: Int): BigInt = {
  if (n==1){
    1
  }
  else
    n * factorial(n-1)
}
```

## Array

```scala
// Initializing an array without assigning values
val myArray = new Array[Type](size)

// Assigning value to myArray at the position idx
myArray(idx) = value

// Initializing an array with values
val myArray = Array(value1, value2)
```

- `value1` and `value2` in the above code can be of
  different types.


## ArrayBuffer

`Array` is not resizable. In order to be able to resize
an array by appending new elements to the beginning,
ending or middle of the array, one can use
`ArrayBuffer`:

```scala
import scala.collection.mutable.ArrayBuffer

// Initializing an array without assigning values and size
val myArray = ArrayBuffer[Type]()

// Insert value1 in the position 0 of myArray
myArray.insert(0, value1)

// Appending value2 to myArray
myArray += value2

// Appending an array to myArray
myArray ++= Array(value3, value4)

// Changing the value of myArray at the position idx
myArray(idx) = value5

// Creating a new room at the position idx by pushing the
// rest of the elements to the right and assigning value6
// to it
myArray.insert(idx, value6)

// Removing k elements starting the position idx
myArray.remove(idx, k)

// Display each element of myArray in a new line
myArray.foreach(println)
```

- Use either of `myArray.length` or `myArray.size` to
  get the length of `myArray`.

## Some mathematical operations over arrays of numbers

For an array of numbers, no matter if it is defined by
`Array` or `ArrayBuffer`, one can do some mathematical
operations: 

```scala
val myArray = Array(1.2, .75, .25, 2.3, -1)

val max = myArray.max
val min = myArray.min
val sum = myArray.sum
val ascArray = myArray.sortWith(_<_)
val desArray = myArray.sortWith(_>_)
```

## Multi-dimensional array
```scala
val two_dim_array = Array.ofDim[Int](10,10)
for {
  i <- 0 to 9
  j <- 0 to 9
} {
  two_dim_array(i)(j) = i * j
}
```

## Maps

```scala
// Immutable maps (key-value pairs can not change)
val myMap = Map(key1 -> value1, key2 -> value2)

// Mutable maps (key-value pairs can be changed or later assigned)
val myMutableMap = collection.mutable.Map(key1 -> value1)
myMutableMap(key2) = value2

// For loop on maps
for ((k,v) <- myMap){
  println(s"$k: $v")
}

// Check if a map contains a key
myMap.contains(key)    // Returns boolean
```

## Tuples

```scala
val myTuple = (value1, value2, value3)

// Accessing the second element of myTuple (value2)
println(myTuple._2)

// Iteration over the tuple elements
for (x <- myTuple.productIterator){
  println(x)
}
```

## Classes

Like many other languages scala allows to create
classes. Classes may contain fields (values and
variables) and methods.

```scala
object ClassTutorial {

  class Employee(var name: String = "UNK" , var position: String = "UNK") {
    // Class fields can also be defined inside the class body
    private val id = Employee.newIdNum

    // Getters
    def getName: String = name
    def getPosition: String = position
    def getId: Int = id

    // Setters
    def setName(foo: String): Unit = {
      //Check if the String contains numbers and if so don't allow
      if(!(foo.matches(".*\\d+.*")))
        this.name = foo
      else
        this.name = "UNK"
    }

    def setPosition(position: String): Unit = {
      this.position = position
    }

    override def toString: String = {
      return "%s with the id %d works as %s".format(
        this.name, this.id, this.position)
    }
  } // End of class


  // The companion object for the class Employee
  object Employee {
    var idNumber = 0
    private def newIdNum: Int = {
      idNumber += 1
      return idNumber 
    }
  }


  def main(args: Array[String]): Unit = {
    val unk = new Employee
    val julien = new Employee("Mike", "Program Manager")
    julien.setName("Mike Anderson")
    println(julien.name)
    println(julien.position)
    println(julien.getId)
    println(julien.toString)
  }

}
```

- The companion object for a class is where you'd define
static class variables and functions in Java.

## Inheritance

A class that inherits from another gains all its fields
and methods. In the following example, the class
`Intern` inherits from the class `Employee`, provided in
the [classes](#classes) section:

```scala
class Intern(name: String = "UNK",
             position: String = "UNK",
             var school: String = "UNK") extends Employee(name, position){

  def getSchool: String = school
              
  def setSchool(school: String): Unit = {
    this.school = school
  }
    
  override def toString: String = {
    return "%s with the id %d is a %s intern from %s".format(
      this.name, this.getId, this.position, this.school)
  }

}


def main(args: Array[String]): Unit = {
  val julien = new Employee("Mike Anderson", "Program Manager")
  val boris = new Intern("Boris Jones", "Data Scientist", "Paris-Saclay")
  println(julien.toString)
  println(boris.toString)
}
```

- A class declared as final can not be extended.
- In the constructor of a child class, the inherited
  fields should not be declared as `val` nor `var`.
- The child classes do not have access to the private
  members of the parent class.

## Abstract classes

```scala
abstract class Student(val name: String){
  // An abstract field has no initial value
  var age: Int
  // An abstract method has no body
  def showInfo: String
}

class FirstGrade(name: String) extends Student(name){
  var age = 7
  // Do not override when defining abstract fields
  def showInfo = "%s is %d years old".format(this.name, this.age)
}
```

## Traits

In Scala, a `trait` is similar to an `interface` in
Java. Unlike Java interfaces, traits can provide
*concrete* methods and fields, i.e., methods and fields
which are directly defined in the trait body. The
following example shows two traits `Real` and
`Imaginary` which are later used to create the class
`Complex`:

```scala
trait Real{
  def Re: Double
  def ReToString: String = Re.toString
}

trait Imaginary{
  def Im: Double
  def ImToString: String = {
    if(Im==0){
      return ""
    } else if(Im > 0){
      return "+"+Im.toString+"i"
    } else{
      return Im.toString+"i"
    }
  }
}

class Complex(var real: Double = 0.0, var imaginary: Double = 0.0)
extends Real with Imaginary{
  def Re = real
  def Im = imaginary
  override def toString: String = {
    if(Re==0 && Im!=0)
      return ImToString
    else
      return ReToString + ImToString
  }
}
```

- While declaring a class, for extending more than two
  traits use the syntax:
  ```scala
  class myClass extends Trait1 with Trait2 with Trait3 with ...
  ```

## Higher order functions

One can apply a method to all items of a list with
`map`. The method can be either predefined or
anonymous:

```scala
val myList = List(100.0, 1000.0, 10000.0)

// log10 is already defined and exists in scala.math
println(myList.map(scala.math.log10))

// An anonymous method that receives an Int x and divides it by 50
println(myList.map((x: Double) => x/50))
```

- The output of `myList.map(method)` is a list as well.

One can filter a list using `filter`. This utility
allows you to retain only those items of the list that
meet a certain condition.

```scala
val myList = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
println(myList.filter(_ % 2 == 0))
```

- It is important to note that `_ % 2 == 0` is a
  method that receives a number and returns `true` if
  the number is even, otherwise it returns `false`.
- More generally, one can use the syntax
  `myList.filter(method)` in which `method` is a
  function returning a `Boolean` necessarily. In this
  case, only those items of `myList` are retained for
  which `method` returns `true`.

Methods can be passed to a method as input in scala:

```scala
def myMethod(func: (Double)=>Double, num: Double): Double = {
  return func(num)
}
println(myMethod(scala.math.exp, 2))
```
 - Note that here `(Double)=>Double` declares a
   datatype, and that is any function which receives a
   `Double` and returns a `Double`.

## File I/O

Use `java.io.FileWriter` to write into a file:

```scala
import java.io.FileWriter

val writer = new FileWriter("test.txt")
// For appending a text uncomment the following line
//val writer = new FileWriter("test.txt", true)
writer.write("This is a sample text.\n")
writer.write("And this is another one.")
writer.close()
```

Use `scala.io.Source` to read from a file:

```scala
import scala.io.Source

val reader = Source.fromFile("test.txt", "UTF-8")
val lines = reader.getLines()
lines.foreach(println)
reader.close()
```

## Exception handling

```scala
def divideNums(num1: Int, num2: Int) =
  try{
    // If no error rises, the code here would be implemented
    num1 / num2
  } catch {
    // If error rises, the code here would be implemented
    case ex: java.lang.ArithmeticException => "ERROR"
  } finally {
    // Clean up after exception here
  }
```

