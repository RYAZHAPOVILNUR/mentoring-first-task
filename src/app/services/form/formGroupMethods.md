Конечно, вот шпаргалка с методами `FormGroup`, разделенными на категории CRUD и отформатированная плотнее по вертикали:

### Create (Создание)
- **addControl(name: string, control: AbstractControl)**: Добавляет новый контрол в группу.

### Read (Чтение)
- **contains(name: string)**: Проверяет, существует ли контрол с указанным именем в группе.
- **get(path: string | (string | number)[])**: Возвращает контрол по указанному пути.
- **hasError(errorCode: string, path?: string | (string | number)[])**: Проверяет, есть ли ошибка с указанным кодом у формы или контрола.
- **getError(errorCode: string, path?: string | (string | number)[])**: Возвращает ошибку с указанным кодом для формы или контрола.
- **value**: Объект, содержащий текущие значения всех контролов в группе.
- **valid**: Логическое значение, указывающее, является ли форма валидной.
- **invalid**: Логическое значение, указывающее, является ли форма невалидной.
- **pending**: Логическое значение, указывающее, находится ли форма в состоянии ожидания (pending).
- **pristine**: Логическое значение, указывающее, является ли форма "чистой" (pristine).
- **dirty**: Логическое значение, указывающее, является ли форма "грязной" (dirty).
- **touched**: Логическое значение, указывающее, был ли контрол тронут (touched).
- **untouched**: Логическое значение, указывающее, не был ли контрол тронут (untouched).
- **disabled**: Логическое значение, указывающее, отключена ли форма.
- **enabled**: Логическое значение, указывающее, включена ли форма.

### Update (Обновление)
- **setControl(name: string, control: AbstractControl)**: Заменяет существующий контрол в группе новым.
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для всех контролов в группе. Строгий метод.
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для указанных контролов в группе. Гибкий метод.
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Сбрасывает форму к исходному значению или переданному значению.
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Обновляет значение и валидность формы и триггерит соответствующие события.
- **markAsTouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "троганные" (touched).
- **markAsUntouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "не троганные" (untouched).
- **markAsDirty(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "грязные" (dirty).
- **markAsPristine(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "чистые" (pristine).
- **markAsPending(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Помечает все контролы в группе как "в ожидании" (pending).
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Отключает все контролы в группе.
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Включает все контролы в группе.
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**: Устанавливает ошибки для формы или контрола.

### Delete (Удаление)
- **removeControl(name: string)**: Удаляет контрол из группы по имени.

Эта компактная организация методов `FormGroup` по категориям CRUD поможет вам легко находить нужные методы в зависимости от задачи.

Конечно, вот шпаргалка с методами `FormGroup`, разделенная на абстрактные категории:

### Структура (Structure)
- **addControl(name: string, control: AbstractControl)**: Добавляет новый контрол в группу.
- **removeControl(name: string)**: Удаляет контрол из группы по имени.
- **setControl(name: string, control: AbstractControl)**: Заменяет существующий контрол в группе новым.
- **contains(name: string)**: Проверяет, существует ли контрол с указанным именем в группе.

### Значения (Values)
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для всех контролов в группе. Строгий метод.
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для указанных контролов в группе. Гибкий метод.
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Сбрасывает форму к исходному значению или переданному значению.
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Обновляет значение и валидность формы и триггерит соответствующие события.
- **value**: Объект, содержащий текущие значения всех контролов в группе.

### Состояния (States)
- **markAsTouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "троганные" (touched).
- **markAsUntouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "не троганные" (untouched).
- **markAsDirty(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "грязные" (dirty).
- **markAsPristine(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "чистые" (pristine).
- **markAsPending(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Помечает все контролы в группе как "в ожидании" (pending).
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Отключает все контролы в группе.
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Включает все контролы в группе.
- **valid**: Логическое значение, указывающее, является ли форма валидной.
- **invalid**: Логическое значение, указывающее, является ли форма невалидной.
- **pending**: Логическое значение, указывающее, находится ли форма в состоянии ожидания (pending).
- **pristine**: Логическое значение, указывающее, является ли форма "чистой" (pristine).
- **dirty**: Логическое значение, указывающее, является ли форма "грязной" (dirty).
- **touched**: Логическое значение, указывающее, был ли контрол тронут (touched).
- **untouched**: Логическое значение, указывающее, не был ли контрол тронут (untouched).
- **disabled**: Логическое значение, указывающее, отключена ли форма.
- **enabled**: Логическое значение, указывающее, включена ли форма.

### Ошибки и Валидация (Errors and Validation)
- **hasError(errorCode: string, path?: string | (string | number)[])**: Проверяет, есть ли ошибка с указанным кодом у формы или контрола.
- **getError(errorCode: string, path?: string | (string | number)[])**: Возвращает ошибку с указанным кодом для формы или контрола.
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**: Устанавливает ошибки для формы или контрола.

### Доступ (Access)
- **get(path: string | (string | number)[])**: Возвращает контрол по указанному пути.

Эта организация методов по абстрактным категориям поможет вам лучше понять их назначение и упростить поиск нужного метода в зависимости от задачи.

### Структура (Structure)
#### Добавление и удаление контролов (Add/Remove Controls)
- **addControl(name: string, control: AbstractControl)**: Добавляет новый контрол в группу.
- **removeControl(name: string)**: Удаляет контрол из группы по имени.

#### Замена контролов (Replace Controls)
- **setControl(name: string, control: AbstractControl)**: Заменяет существующий контрол в группе новым.

#### Проверка наличия контролов (Check Controls)
- **contains(name: string)**: Проверяет, существует ли контрол с указанным именем в группе.

### Значения (Values)
#### Установка значений (Set Values)
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для всех контролов в группе. Строгий метод.
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для указанных контролов в группе. Гибкий метод.

#### Сброс значений (Reset Values)
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Сбрасывает форму к исходному значению или переданному значению.

#### Обновление значений и валидации (Update Values and Validation)
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Обновляет значение и валидность формы и триггерит соответствующие события.

#### Доступ к значениям (Access Values)
- **value**: Объект, содержащий текущие значения всех контролов в группе.

### Состояния (States)
#### Изменение состояния (Change State)
- **markAsTouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "троганные" (touched).
- **markAsUntouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "не троганные" (untouched).
- **markAsDirty(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "грязные" (dirty).
- **markAsPristine(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "чистые" (pristine).
- **markAsPending(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Помечает все контролы в группе как "в ожидании" (pending).
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Отключает все контролы в группе.
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Включает все контролы в группе.

#### Проверка состояния (Check State)
- **valid**: Логическое значение, указывающее, является ли форма валидной.
- **invalid**: Логическое значение, указывающее, является ли форма невалидной.
- **pending**: Логическое значение, указывающее, находится ли форма в состоянии ожидания (pending).
- **pristine**: Логическое значение, указывающее, является ли форма "чистой" (pristine).
- **dirty**: Логическое значение, указывающее, является ли форма "грязной" (dirty).
- **touched**: Логическое значение, указывающее, был ли контрол тронут (touched).
- **untouched**: Логическое значение, указывающее, не был ли контрол тронут (untouched).
- **disabled**: Логическое значение, указывающее, отключена ли форма.
- **enabled**: Логическое значение, указывающее, включена ли форма.

### Ошибки и Валидация (Errors and Validation)
#### Установка ошибок (Set Errors)
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**: Устанавливает ошибки для формы или контрола.

#### Проверка и получение ошибок (Check and Get Errors)
- **hasError(errorCode: string, path?: string | (string | number)[])**: Проверяет, есть ли ошибка с указанным кодом у формы или контрола.
- **getError(errorCode: string, path?: string | (string | number)[])**: Возвращает ошибку с указанным кодом для формы или контрола.

### Доступ (Access)
#### Получение контролов (Get Controls)
- **get(path: string | (string | number)[])**: Возвращает контрол по указанному пути.

### Примеры использования
#### Валидация формы
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**
- **hasError(errorCode: string, path?: string | (string | number)[])**
- **getError(errorCode: string, path?: string | (string | number)[])**

#### Сброс формы
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**

#### Обновление контролов
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**

#### Управление состоянием
- **markAsTouched(options?: { onlySelf?: boolean })**
- **markAsUntouched(options?: { onlySelf?: boolean })**
- **markAsDirty(options?: { onlySelf?: boolean })**
- **markAsPristine(options?: { onlySelf?: boolean })**
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**

#### Динамическое добавление/удаление контролов
- **addControl(name: string, control: AbstractControl)**
- **removeControl(name: string)**

Эта организация методов `FormGroup` по абстрактным категориям и ситуациям использования поможет вам лучше ориентироваться в методах и выбрать подходящие для конкретных задач.

# Шпаргалка по методам FormGroup

## Структура (Structure)
### Добавление и удаление контролов (Add/Remove Controls)
- **addControl(name: string, control: AbstractControl)**: Добавляет новый контрол в группу.
- **removeControl(name: string)**: Удаляет контрол из группы по имени.

### Замена контролов (Replace Controls)
- **setControl(name: string, control: AbstractControl)**: Заменяет существующий контрол в группе новым.

### Проверка наличия контролов (Check Controls)
- **contains(name: string)**: Проверяет, существует ли контрол с указанным именем в группе.

## Значения (Values)
### Установка значений (Set Values)
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для всех контролов в группе. Строгий метод.
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для указанных контролов в группе. Гибкий метод.

### Сброс значений (Reset Values)
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Сбрасывает форму к исходному значению или переданному значению.

### Обновление значений и валидации (Update Values and Validation)
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Обновляет значение и валидность формы и триггерит соответствующие события.

### Доступ к значениям (Access Values)
- **value**: Объект, содержащий текущие значения всех контролов в группе.

## Состояния (States)
### Изменение состояния (Change State)
- **markAsTouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "троганные" (touched).
- **markAsUntouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "не троганные" (untouched).
- **markAsDirty(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "грязные" (dirty).
- **markAsPristine(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "чистые" (pristine).
- **markAsPending(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Помечает все контролы в группе как "в ожидании" (pending).
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Отключает все контролы в группе.
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Включает все контролы в группе.

### Проверка состояния (Check State)
- **valid**: Логическое значение, указывающее, является ли форма валидной.
- **invalid**: Логическое значение, указывающее, является ли форма невалидной.
- **pending**: Логическое значение, указывающее, находится ли форма в состоянии ожидания (pending).
- **pristine**: Логическое значение, указывающее, является ли форма "чистой" (pristine).
- **dirty**: Логическое значение, указывающее, является ли форма "грязной" (dirty).
- **touched**: Логическое значение, указывающее, был ли контрол тронут (touched).
- **untouched**: Логическое значение, указывающее, не был ли контрол тронут (untouched).
- **disabled**: Логическое значение, указывающее, отключена ли форма.
- **enabled**: Логическое значение, указывающее, включена ли форма.

## Ошибки и Валидация (Errors and Validation)
### Установка ошибок (Set Errors)
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**: Устанавливает ошибки для формы или контрола.

### Проверка и получение ошибок (Check and Get Errors)
- **hasError(errorCode: string, path?: string | (string | number)[])**: Проверяет, есть ли ошибка с указанным кодом у формы или контрола.
- **getError(errorCode: string, path?: string | (string | number)[])**: Возвращает ошибку с указанным кодом для формы или контрола.

## Доступ (Access)
### Получение контролов (Get Controls)
- **get(path: string | (string | number)[])**: Возвращает контрол по указанному пути.

## События (Events)
### Отслеживание изменений значений (Track Value Changes)
- **valueChanges**: `Observable`, который эмитирует события при изменении значений формы.

### Отслеживание изменений статуса (Track Status Changes)
- **statusChanges**: `Observable`, который эмитирует события при изменении статуса формы.

# Шпаргалка по методам FormGroup

## Структура (Structure)
### Добавление и удаление контролов (Add/Remove Controls)
- **addControl(name: string, control: AbstractControl)**: Добавляет новый контрол в группу.
- **removeControl(name: string)**: Удаляет контрол из группы по имени.

### Замена контролов (Replace Controls)
- **setControl(name: string, control: AbstractControl)**: Заменяет существующий контрол в группе новым.

### Проверка наличия контролов (Check Controls)
- **contains(name: string)**: Проверяет, существует ли контрол с указанным именем в группе.

## Значения (Values)
### Установка значений (Set Values)
- **setValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для всех контролов в группе. Строгий метод.
- **patchValue(value: { [key: string]: any }, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Устанавливает значения для указанных контролов в группе. Гибкий метод.

### Сброс значений (Reset Values)
- **reset(value?: any, options?: { onlySelf?: boolean, emitEvent?: boolean })**: Сбрасывает форму к исходному значению или переданному значению.

### Обновление значений и валидации (Update Values and Validation)
- **updateValueAndValidity(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Обновляет значение и валидность формы и триггерит соответствующие события.

### Доступ к значениям (Access Values)
- **value**: Объект, содержащий текущие значения всех контролов в группе.

## Состояния (States)
### Изменение состояния (Change State)
- **markAsTouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "троганные" (touched).
- **markAsUntouched(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "не троганные" (untouched).
- **markAsDirty(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "грязные" (dirty).
- **markAsPristine(options?: { onlySelf?: boolean })**: Помечает все контролы в группе как "чистые" (pristine).
- **markAsPending(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Помечает все контролы в группе как "в ожидании" (pending).
- **disable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Отключает все контролы в группе.
- **enable(options?: { onlySelf?: boolean, emitEvent?: boolean })**: Включает все контролы в группе.

### Проверка состояния (Check State)
- **valid**: Логическое значение, указывающее, является ли форма валидной.
- **invalid**: Логическое значение, указывающее, является ли форма невалидной.
- **pending**: Логическое значение, указывающее, находится ли форма в состоянии ожидания (pending).
- **pristine**: Логическое значение, указывающее, является ли форма "чистой" (pristine).
- **dirty**: Логическое значение, указывающее, является ли форма "грязной" (dirty).
- **touched**: Логическое значение, указывающее, был ли контрол тронут (touched).
- **untouched**: Логическое значение, указывающее, не был ли контрол тронут (untouched).
- **disabled**: Логическое значение, указывающее, отключена ли форма.
- **enabled**: Логическое значение, указывающее, включена ли форма.

## Ошибки и Валидация (Errors and Validation)
### Установка ошибок (Set Errors)
- **setErrors(errors: ValidationErrors, options?: { emitEvent?: boolean })**: Устанавливает ошибки для формы или контрола.

### Проверка и получение ошибок (Check and Get Errors)
- **hasError(errorCode: string, path?: string | (string | number)[])**: Проверяет, есть ли ошибка с указанным кодом у формы или контрола.
- **getError(errorCode: string, path?: string | (string | number)[])**: Возвращает ошибку с указанным кодом для формы или контрола.

## Доступ (Access)
### Получение контролов (Get Controls)
- **get(path: string | (string | number)[])**: Возвращает контрол по указанному пути.

## События (Events)
### Отслеживание изменений (Track Changes)
- **valueChanges**: `Observable`, который эмитирует события при изменении значений формы.
