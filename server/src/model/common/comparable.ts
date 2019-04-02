/**
 * Defines a generalized comparison method that a type implements to create a
 * type-specific comparison method for ordering or sorting its instances.
 */
export interface Comparable<T> {
  /**
   * Compares the current instance with another object of the same type and
   * returns an integer that indicates whether the current instance precedes,
   * follows, or occurs in the same position in the sort order as the other object.
   * @param other An object to compare with this instance.
   */
  compareTo(other: T): number
}

export default Comparable
