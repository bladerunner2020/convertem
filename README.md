# Convert 'em

Small library that helps with convertion. Could be very helpful when getting values from configuration files (like yaml, etc).

- **toNumber** - convert argument to a number or return null if conversion failed
  ```js
  toNumber('42'); // 42
  toNumber('0x42'); // 0x42
  toNumber(42); // 42
  toNumber('true'); // 1
  ```

- **toBoolean** - convert argument to a boolean
  ```js
  toBoolean('1'); // true
  toBoolean(42); // true
  toBoolean('True'); // true
  toBoolean('yes'); // true
  toBoolean('on'); // true

  toBoolean(); // false
  toBoolean(null); // false
  toBoolean(''); // false
  toBoolean('0'); // false
  toBoolean(0); // false
  toBoolean('FALSE'); // false
  toBoolean('No'); // false
  toBoolean('Off'); // false
  ```

- **toMilliseconds** - convert argument to a milliseconds
  ```js
  toMilliseconds(42); // 42
  toMilliseconds('42'); // 42
  toMilliseconds('42 ms'); // 42
  toMilliseconds('42 s'); // 42000
  toMilliseconds('42 sec'); // 42000
  toMilliseconds('42 seconds'); // 42000
  toMilliseconds('42 m'); // 42000 * 60
  toMilliseconds('42 min'); // 42000 * 60
  toMilliseconds('42 minutes'); // 42000 * 60
  toMilliseconds('42 h'); // 42000 * 3600
  toMilliseconds('42 hours'); // 42000 * 3600
  toMilliseconds('1:30'); // 90000
  toMilliseconds('42:00:00'); // 42000 * 3600
  toMilliseconds(); // 0
  toMilliseconds(''); // 0
  toMilliseconds(null); // 0
  ```
