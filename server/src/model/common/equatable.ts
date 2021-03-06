/**
 * Defines a generalized method that a type implements to create a type-specific method for determining equality of instances.
 */
export interface Equatable<T> {
  /**
   * Indicates whether the current object is equal to another object of the same type.
   * @param other An object to compare with this object.
   */
  equals(other: T): boolean
}

export default Equatable
