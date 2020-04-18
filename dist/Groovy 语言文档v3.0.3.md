# Groovy 语言文档v3.0.3



## 1.语言规范

## 1.1 句法

### 1.1.1 注释



#### 单行注释

```groovy
// a standalone single line comment
println "hello" // a comment till the end of the line
```



#### 多行注释

```groovy
/* a standalone multiline comment
   spanning two lines */
println "hello" /* a multiline comment starting
                   at the end of a statement */
println 1 /* one */ + 2 /* two */
```

#### 类,接口,方法注释

其实与java的注释都差不多了，写代码笔者建议多写写注释

```groovy
/**
 * A Class description
 */
class Person {
    /** the name of the person */
    String name

    /**
     * Creates a greeting method for a certain person.
     *
     * @param otherPerson the person to greet
     * @return a greeting message
     */
    String greet(String otherPerson) {
       "Hello ${otherPerson}"
    }
}
```

与java 不一样的是，groovy支持运行时的doc，意识就是在运行时，可以通过代码获取到类的注释文本

> 默认情况，Groovydoc是禁用的，如果你想要开启，可以通过jvm选项启动
>
> -Dgroovy.attach.runtime.groovydoc=true

笔者是觉得这个特性目前是没有太大用处，但是作为一种新特性，肯定是有一点点用处，说不定以后注释就和注解一样，有着特定的意义与功能，代码如下。

```groovy
/**@
 * Some class groovydoc for Foo
 */
class Foo {
    /**@
     * Some method groovydoc for bar
     */
    void bar() {
    }
}

assert Foo.class.groovydoc.content.contains('Some class groovydoc for Foo') 
assert Foo.class.getMethod('bar', new Class[0]).groovydoc.content.contains('Some method groovydoc for bar')
```



### 1.1.2 关键字

|        |         |            |            |
| ------ | ------- | ---------- | ---------- |
| as     | assert  | break      | case       |
| catch  | class   | const      | continue   |
| def    | default | do         | else       |
| enum   | extends | false      | finally    |
| for    | goto    | if         | implements |
| import | in      | instanceof | interface  |
| new    | null    | package    | return     |
| super  | switch  | this       | throw      |
| throws | trait   | true       | try        |
| var    | while   |            |            |

### 1.1.3 变量命名规则

#### 普通命名规则

其实这一块对于java程序员可以不用说了，粗略讲一下，变量名以字母，$,或者_开头，但绝对不能是数字开头。

字符可以在如下的范围

- “ a”到“ z”（小写的ascii字母）
- “ A”到“ Z”（大写字母）
- '\ u00C0'至'\ u00D6'
- '\ u00D8'至'\ u00F6'
- '\ u00F8'至'\ u00FF'
- '\ u0100'到'\ uFFFE'

然后后面的字符可以包含字母和数字

```groovy
def name
def item3
def with_underscore
def $dollarStart
```

还有一个就是变量名不能是关键字

#### 带引号的的变量名

带引号的变量名一般是在点号运算符后面，例如person.name可以使用person."name"来进行表示，这样使得groovy 的变量命名变得很灵活

```groovy
def map = [:]//定义一个map

map."an identifier with a space and double quotes" = "ALLOWED"//往map从存放键值对，相当于java的put
map.'with-dash-signs-and-single-quotes' = "ALLOWED"

assert map."an identifier with a space and double quotes" == "ALLOWED"
assert map.'with-dash-signs-and-single-quotes' == "ALLOWED"
```

另外的，也可以这么写,也就是说，只要是字符串都可以，下面的都是groovy 支持的字符串格式，作为变量名都是被支持的

```groovy
map.'single quote'
map."double quote"
map.'''triple single quote'''
map."""triple double quote"""
map./slashy string/
map.$/dollar slashy string/$
```

普通的字符串与groovy 的GString（插值字符串），同样是可以被支持的,如下定义了一个firstname的变量，然后，在GString字符串中使用插值表达式进行引用

```groovy
def firstname = "Homer"
map."Simpson-${firstname}" = "Homer Simpson"

assert map.'Simpson-Homer' == "Homer Simpson"
```



### 1.1.4 字符串

在groovy中，有2中字符串基础类型，一种是java中的`java.lang.String`对象字符串，另外一种是groovy中支持的GStrings`groovy.lang.GString`,GStrings在其他语言中也被成为内插值字符串。



#### 单引号字符串

```groovy
'a single-quoted string'
```

> 注意：单引号字符串是纯文本`java.lang.String`类型，不支持插值。



#### 字符串拼接

```groovy
'a' + 'b'
```



#### 三引号字符串

```groovy
'''a triple-single-quoted string'''
```

>注意：单引号字符串是纯文本`java.lang.String`类型，不支持插值。

三重单引号字符串可能跨域多行，字符串内容可以跨界，无需分成几段，无需类似java中使用+进行拼接以及换行符号

```groovy
def aMultilineString = '''line one
line two
line three'''
```

如果你的代码有缩进，可能会导致这个字符串达不到最终想要的效果，例如如下代码，左边有缩进，拿到的字符串肯定是有问题的。Groovy提供`String#stripIndent()` 和`String#stripMargin()`来去除掉掉无用的数据。

```groovy
    def startingAndEndingWithANewline = '''
        line one
        line two
        line three
    '''
```



你估计可以看到，字符串第一个字符居然是换行符号，可以在后面使用 \ 将其去掉

```groovy
def strippedFirstNewline = '''\
line one
line two
line three
'''

assert !strippedFirstNewline.startsWith('\n')
```

#### 特殊字符串的转义

| 转义序列 | 字符                                                         |
| :------- | :----------------------------------------------------------- |
| \b       | 退格键                                                       |
| \F       | 换页                                                         |
| \n       | 换行                                                         |
| \r       | 回车                                                         |
| \s       | 单空格                                                       |
| \t       | 制表                                                         |
| \\\      | 反斜杠                                                       |
| \\'      | 单引号字符串中的单引号（对于三重单引号和双引号字符串是可选的） |
| \\"      | 双引号字符串中的双引号（三重双引号和单引号字符串是可选的）   |





#### Unicode转义

没什么可说的，看代码

```groovy
'你好的Unicode是: \u4F60\u597D'
```



#### 双引号字符串

```groovy
"a double-quoted string"
```





#### 字符串插值

除了单引号，与三引号单引号字符串外，任何Groovy 表达式都是支持插值的

```groovy
def name = 'Guillaume' // a plain string
def greeting = "Hello ${name}"

```

插值表达式不仅仅支持变量引用，还支持数学运算呢

```groovy
def sum = "The sum of 2 and 3 equals ${2 + 3}"
```

除了`${}`占位符，我们还可以用$，而不需要花括号当然局限性就打了很多，只限在变量引用的范围。如下代码，

```groovy
def name="UsErNaMeIs:CaT"
println "$name"
println "$name.toUpperCase()"//需要注意这个语句会抛出异常，因为解析器将其解释为"${name.toUpperCase}()",所以会抛出属性未找到异常。使用的时候建议谨慎使用
```



如下，如果表达式不明确，会出现.误引用的问题。所以一般建议是用${}

```groovy
String bookName="红楼梦"

String desc="这本书的名字是:$bookName.作者是:xxx"
String desc2="这本书的名字是:${bookName}.作者是:xxx"
```



#### 内插值闭包的情况

由于内插值其实相当一个返回特定数据的代码块，所以，其必也支持Groovy 的伟大特性之一闭包



```groovy
def sParameterLessClosure = "1 + 2 == ${-> 3}" //不带参数的闭包
assert sParameterLessClosure == '1 + 2 == 3'

def sOneParamClosure = "1 + 2 == ${ w -> w << 3}" //使用<<3为w赋值，这里的<<3不是左移运算符哦
assert sOneParamClosure == '1 + 2 == 3'
```

内插值闭包提供了一个有趣的特点，惰性求值



```groovy
def number = 1
def eagerGString = "value == ${number}"
def lazyGString = "value == ${ -> number }"
println eagerGString
println lazyGString
number=2
println eagerGString     //输出还是1，字符串在编译的时候，就已经定型了
println lazyGString     //输出的是2，也就是说，字符串的值只会在执行到的时候，才会去计算
```



#### 与Java的相互转换

如果有一个方法，其输入参数是`java.lang.String`时候，但是我们传递了一`groovy.lang.GString`的话，那么groovy 将会透明的帮我们调用toString()方法





```groovy
//定义一个方法，要求输入的参数时java.lang.String类型
String takeString(String message) {         
    assert message instanceof String        
    return message
}

//定义一个GString类型的字符串
def message = "The message is ${'hello'}"   
assert message instanceof GString      //断言以证明其实GString类型     

def result = takeString(message)  		//将GString 作为参数传递给taskString方法，发现其没有发生异常          
assert result instanceof String
```



#### GString和String 的 哈希值

纯java字符串的hashCode是不可变的，而GString的字符串表示却有所不同，取决于其内插值，即使对于相同的GString和String ，其HashCode 也可能不同,如下例子，虽然都是一样的字符串，但是HashCode 是不同的

```groovy
println "one:${1}".hashCode()
println "one:1".hashCode()

//但是，如果对GString进行toString()的话，就可以得到一样的哈希值
println "one:${1}".toString().hashCode()
println "one:1".hashCode()
```

由于GString的hash是不可预测的，所以，在使用map 存放key为String的数据的时候，应该尽量避免使用GString,因为对于map,其取数据时用hash值进行获取的，这一点是需要开发过程中特别注意的点。

```groovy
def key = "a"
def m = ["${key}": "letter ${key}"]

assert m["a"] == null    //可以断言发现是取不到值的  
```